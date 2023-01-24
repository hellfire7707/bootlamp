package com.yes27.bootcamp.controller;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yes27.bootcamp.dto.BootcampDto;
import com.yes27.bootcamp.entity.BootCamp;
import com.yes27.bootcamp.mapper.BootcampMapper;
import com.yes27.bootcamp.service.BootcampService;
import com.yes27.member.entity.Member;
import com.yes27.member.service.MemberService;
import com.yes27.mybootcamp.service.MybootcampService;
import com.yes27.response.MultiResponseDto;
import com.yes27.response.SingleResponseDto;

@RestController
@RequestMapping("/bootcamp")
public class BootcampController {
	@Autowired
    BootcampService bootcampService;
	@Autowired
    MemberService memberService;
	@Autowired
    MybootcampService mybootcampService;
	@Autowired
    BootcampMapper mapper;
    
    //일정 수정
    @PatchMapping("/{bootcampId}")
    public ResponseEntity patchCamp(@PathVariable("bootcampId") Long bootcampId,
                                    @RequestBody BootcampDto.Patch patchDto){
        BootCamp bootCamp = mapper.bootPatchDtoToBootcamp(patchDto);
        bootCamp.setBootcampId(bootcampId);

        BootcampDto.PatchResponse response = mapper.bootcampToBootPatchResponseDto(bootcampService.update(bootCamp));
        return new ResponseEntity(response, HttpStatus.OK);

    }

    /** 부트캠프/학원일정 리스트 조회 
     * @param page
     * @param size
     * @param sort
     * @return
     */
    @GetMapping
    public ResponseEntity getCamps(@Positive @RequestParam int page,
                                  @Positive @RequestParam int size,
                                   @RequestParam(required = false) String sort){
        if(sort == null) {
            Page<BootCamp> pageBootcamps = bootcampService.findBootcamps(page - 1, size);
            List<BootCamp> bootcamps = pageBootcamps.getContent();
            return new ResponseEntity(new MultiResponseDto<>(mapper.bootcampToBootcampResponsesDto(bootcamps),pageBootcamps),HttpStatus.OK);
        }
        Page<BootCamp> pageBootcamps = bootcampService.findBootscamp(page-1, size, sort);
        List<BootCamp> bootcamps = pageBootcamps.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.bootcampToBootcampResponsesDto(bootcamps),pageBootcamps), HttpStatus.OK);

    }
    
    //상세 조회 로그인 한 경우
    @GetMapping("/{bootcampId}")
    public ResponseEntity getCamp(@PathVariable("bootcampId") Long bootcampId,
                                  HttpServletRequest request){
        Integer isVote = 0;
        try{
            String email = request.getUserPrincipal().getName();
            Member findMember = memberService.findVerifiedMemberByEmail(email); //계정 기준으로 조회
            isVote = bootcampService.isVote(bootcampId, findMember);
        }
        catch (NullPointerException e){
            isVote = 0;
        }
        if(isVote == 0 || isVote == 1) {
            BootcampDto.DetailResponseDto response = mapper.bootcampTobootCampDetailResponseDto(bootcampService.findBootcamp(bootcampId), isVote);
            return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    //삭제
    @DeleteMapping("/{bootcampId}")
    public ResponseEntity deleteCamp(@PathVariable("bootcampId") Long bootcampId){
        bootcampService.delete(bootcampId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    //찜하기
    @PostMapping("/votes/{bootcampId}")
    public ResponseEntity likeCamp(@PathVariable("bootcampId") Long bootcampId,
                                   @RequestParam int vote,
                                   HttpServletRequest request){
        Member member = memberService.findMember(request);
        BootCamp findCamp = bootcampService.findBootcamp(bootcampId);
        mybootcampService.upVote(findCamp, member, vote);
        return new ResponseEntity(HttpStatus.OK);
    }

}
