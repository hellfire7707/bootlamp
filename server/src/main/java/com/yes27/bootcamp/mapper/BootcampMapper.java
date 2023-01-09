package com.yes27.bootcamp.mapper;

import com.yes27.bootcamp.dto.BootcampDto;

import com.yes27.bootcamp.entity.BootCamp;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BootcampMapper {

    /**
     * @param patchDto
     * @return
     */
    BootCamp bootPatchDtoToBootcamp(BootcampDto.Patch patchDto);
    
    
    /** 수정
     * @param bootcamp
     * @return
     */
    BootcampDto.PatchResponse bootcampToBootPatchResponseDto(BootCamp bootcamp);
    
    /** 상세조회
     * @param bootCamp
     * @param isVote
     * @return
     */
    default BootcampDto.DetailResponseDto bootcampTobootCampDetailResponseDto(BootCamp bootCamp, int isVote){
        BootcampDto.DetailResponseDto responseDto = new BootcampDto.DetailResponseDto();
        responseDto.setBootcampId(bootCamp.getBootcampId());
        responseDto.setDuration(bootCamp.getDuration());
        responseDto.setOnOff(bootCamp.getOnOff());
        responseDto.setEndDate(bootCamp.getEndDate());
        responseDto.setSatisfaction(bootCamp.getSatisfaction());
        responseDto.setStartDate(bootCamp.getStartDate());
        responseDto.setSite(bootCamp.getSite());
        responseDto.setProcess(bootCamp.getProcess());
        responseDto.setSuperviser(bootCamp.getSuperviser());
        responseDto.setBeginRegisterDate(bootCamp.getBeginRegisterDate());
        responseDto.setFinalRegisterDate(bootCamp.getFinalRegisterDate());
        responseDto.setWeekendStatus(bootCamp.getWeekendStatus());
        responseDto.setTotalCost(bootCamp.getTotalCost());
        responseDto.setTrTime(bootCamp.getTrTime());
        responseDto.setVote(isVote);

        return responseDto;
    }


    /** 전체조회
     * @param bootcamps
     * @return
     */
    List<BootcampDto.Response> bootcampToBootcampResponsesDto(List<BootCamp> bootcamps);

}