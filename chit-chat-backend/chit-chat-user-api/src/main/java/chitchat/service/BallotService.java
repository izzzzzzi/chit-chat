package chitchat.service;

import chitchat.common.ApiResponse;
import chitchat.entity.ballot.Ballot;
import chitchat.entity.user.User;
import chitchat.enums.PersonalityResultType;
import chitchat.enums.PersonalityTheoryType;
import chitchat.exception.UserIdNotFoundError;
import chitchat.repository.BallotRepository;
import chitchat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BallotService {
    private final UserRepository userRepository;
    private final BallotRepository ballotRepository;

    public ApiResponse<Ballot.Response> vote(Ballot.Request request) {
        User ballotFromUser = userRepository.findByUserId(request.getBallotFromUserId())
                .orElseThrow(() -> new UserIdNotFoundError(request.getBallotFromUserId()));
        User ballotToUser = userRepository.findByUserId(request.getBallotToUserId())
                .orElseThrow(() -> new UserIdNotFoundError(request.getBallotToUserId()));
        PersonalityResultType personalityResultType = request.getPersonalityResultType();
        PersonalityTheoryType personalityTheoryType = request.getPersonalityResultType().getPersonalityTheoryType();

        Ballot ballot = ballotRepository.findByBallotFromAndBallotToAndPersonalityTheoryType(
                        ballotFromUser,
                        ballotToUser,
                        personalityTheoryType
                )
                .orElse(null);

        if (request.getPersonalityResultType().getId() == PersonalityResultType.CANCEL_VOTE.getId()) {
            if (ballot != null) {
                ballotRepository.delete(ballot);
                ballot = null;
            }
        }
        else {
            if (ballot != null) {
                ballot.setPersonalityResultType(request.getPersonalityResultType());
                ballot = ballotRepository.saveAndFlush(ballot);
            }
            else {
                ballot = new Ballot(
                        personalityTheoryType,
                        personalityResultType,
                        ballotFromUser,
                        ballotToUser
                );
                ballot = ballotRepository.saveAndFlush(ballot);
            }
        }

        return ApiResponse.success("ballot", (Ballot.Response.from(ballot)));
    }
}
