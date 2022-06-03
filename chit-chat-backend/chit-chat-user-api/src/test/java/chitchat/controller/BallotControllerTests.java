package chitchat.controller;

import chitchat.common.ApiResponse;
import chitchat.entity.ballot.Ballot;
import chitchat.enums.PersonalityResultType;
import chitchat.service.BallotService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static chitchat.testdata.BallotTestData.ballotFromUser;
import static chitchat.testdata.BallotTestData.ballotToUser;
import static chitchat.utils.data_check.JsonObjectConverter.convertObjectToJson;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles(profiles = "test")
public class BallotControllerTests {
    private static final Logger logger = LoggerFactory.getLogger(BallotControllerTests.class);

    @Autowired
    private MockMvc mvc;

    @MockBean
    private BallotService ballotService;

    private Ballot.Request testRequestBallot;

    @Before
    public void setUp() {
        testRequestBallot = new Ballot.Request();
        testRequestBallot.setBallotFromUserId(ballotFromUser.getUserId());
        testRequestBallot.setBallotToUserId(ballotToUser.getUserId());
        testRequestBallot.setPersonalityResultType(PersonalityResultType.ENFJ);
    }

    @Test
    public void testFirstVote() throws Exception {
        given(ballotService.vote(any())).willReturn(ApiResponse.created("ballot", null));

        mvc.perform(post("/ballot/vote")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(convertObjectToJson(testRequestBallot)))
                .andExpect(status().isCreated());
    }
}
