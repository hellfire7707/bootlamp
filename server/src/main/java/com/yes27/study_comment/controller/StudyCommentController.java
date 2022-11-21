package com.yes27.study_comment.controller;

import com.yes27.member.entity.Member;
import com.yes27.member.service.MemberService;
import com.yes27.response.SingleResponseDto;
import com.yes27.study.entity.Study;
import com.yes27.study.service.StudyService;
import com.yes27.study_comment.dto.StudyCommentDto;
import com.yes27.study_comment.entity.StudyComment;
import com.yes27.study_comment.mapper.StudyCommentMapper;
import com.yes27.study_comment.service.StudyCommentService;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/study")
@Validated
@Slf4j
public class StudyCommentController {
    private final MemberService memberService;
    private final StudyService studyService;
    private final StudyCommentService studyCommentService;
    private final StudyCommentMapper mapper;

    public StudyCommentController(MemberService memberService, StudyService studyService,
        StudyCommentService studyCommentService, StudyCommentMapper mapper) {
        this.memberService = memberService;
        this.studyService = studyService;
        this.studyCommentService = studyCommentService;
        this.mapper = mapper;
    }

    @PostMapping("/{study-id}/comment")
    public ResponseEntity postComment(@PathVariable("study-id") @Positive Long studyId,
        @Valid @RequestBody StudyCommentDto.Post requestBody) {

        Member member = memberService.findVerifiedMember(requestBody.getMemberId());
        Study findStudy = studyService.findVerifiedStudy(studyId);

        requestBody.setStudyId(studyId);
        StudyComment studyComment = mapper.commentPostToComment(requestBody);
        studyComment.setMember(member);
        studyComment.setStudy(findStudy);

        StudyComment createdComment = studyCommentService.createComment(studyComment);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentResponse(createdComment)), HttpStatus.CREATED);
    }

    @PatchMapping("/{study-id}/comment/{comment-id}")
    public ResponseEntity patchComment(
        @PathVariable("study-id") @Positive Long studyId,
        @PathVariable("comment-id") @Positive Long studyCommentId,
        @Valid @RequestBody StudyCommentDto.Patch requestBody) {

        Study findStudy = studyService.findVerifiedStudy(studyId);

        requestBody.setStudyCommentId(studyCommentId);
        StudyComment findStudyComment = mapper.commentPatchToComment(requestBody);
        findStudyComment.setStudy(findStudy);

        StudyComment studyComment = studyCommentService.updateComment(findStudyComment);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentResponse(studyComment)), HttpStatus.OK);
    }

    @GetMapping("/{study-id}/comment/{comment-id}")
    public ResponseEntity getComment(
    @PathVariable("study-id") @Positive Long studyId,
    @PathVariable("comment-id") @Positive Long studyCommentId) {

        StudyComment studyComment = studyCommentService.findComment(studyCommentId);

        return new ResponseEntity<>(mapper.commentToCommentResponse(studyComment), HttpStatus.OK);
    }

    @DeleteMapping("/{study-id}/comment/{comment-id}")
    public ResponseEntity deleteComment(
        @PathVariable("study-id") @Positive Long studyId,
        @PathVariable("comment-id") @Positive Long studyCommentId) {
        studyCommentService.deleteComment(studyCommentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
