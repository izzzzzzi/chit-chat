package chitchat.controller;

import chitchat.common.ApiResponse;
import chitchat.entity.ballot.Ballot;
import chitchat.service.BallotService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users/ballot")
@RequiredArgsConstructor
public class BallotController {
    private static final Logger logger = LoggerFactory.getLogger(BallotController.class);

    private final BallotService ballotService;

    @PostMapping("/vote")
    public ResponseEntity<Ballot.Response> vote(@RequestBody Ballot.Request request) {
        return ballotService.vote(request);
    }
}
