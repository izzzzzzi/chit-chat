package chitchat.service;

import chitchat.common.ApiResponse;
import chitchat.entity.ballot.Ballot;
import chitchat.enums.PersonalityResultType;
import chitchat.repository.BallotRepository;
import chitchat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.junit.Before;
import org.junit.Test;

import static chitchat.testdata.BallotTestData.ballotFromUser;
import static chitchat.testdata.BallotTestData.ballotToUser;
import static org.junit.Assert.assertEquals;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.mockito.BDDMockito.given;

@RequiredArgsConstructor
public class BallotServiceTests {
    private static final Logger logger = LoggerFactory.getLogger(BallotServiceTests.class);

    @Mock
    private BallotRepository ballotRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private BallotService ballotService;

    private Ballot.Request testRequestBallot;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        testRequestBallot = new Ballot.Request();
        testRequestBallot.setBallotFromUserId(ballotFromUser.getUserId());
        testRequestBallot.setBallotToUserId(ballotToUser.getUserId());
        testRequestBallot.setPersonalityResultType(PersonalityResultType.ENFJ);
    }

    @Test
    public void testFirstVote() {
        given(userRepository.findByUserId(ballotFromUser.getUserId()))
                .willReturn(Optional.of(ballotFromUser));
        given(userRepository.findByUserId(ballotToUser.getUserId()))
                .willReturn(Optional.of(ballotToUser));
        given(ballotRepository.findByBallotFromAndBallotToAndPersonalityTheoryType(
                ballotFromUser,
                ballotToUser,
                testRequestBallot.getPersonalityResultType().getPersonalityTheoryType()))
                .willReturn(Optional.empty());

        ResponseEntity<Ballot.Response> resultBallotResponse = ballotService.vote(testRequestBallot);
        assertEquals(HttpStatus.CREATED, resultBallotResponse.getStatusCode());
    }
}
