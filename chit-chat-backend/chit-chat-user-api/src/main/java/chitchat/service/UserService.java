package chitchat.service;

import chitchat.common.ApiResponse;
import chitchat.entity.user.BallotRecord;
import chitchat.entity.user.User;
import chitchat.enums.PersonalityTheoryType;
import chitchat.exception.UserIdNotFoundError;
import chitchat.repository.BallotRepository;
import chitchat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final BallotRepository ballotRepository;
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId).orElse(null);
    }

    public ApiResponse getUserDetail(String userId) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new UserIdNotFoundError(userId));
        List<BallotRecord> ballotRecords = ballotRepository.findWhoVote(user);

        Map<Integer, List<BallotRecord>> voteRecords = new HashMap<>();
        Map<Integer, Long> typeTotalVoteCounts = new HashMap<>();

        for (BallotRecord ballotRecord : ballotRecords) {
            Integer personalityTheoryTypeId = ballotRecord.getPersonalityResultType().getPersonalityTheoryType().getId();
            if (voteRecords.containsKey(personalityTheoryTypeId) == false) {
                voteRecords.put(personalityTheoryTypeId, new ArrayList<>());
                typeTotalVoteCounts.put(personalityTheoryTypeId, 0L);
            }

            voteRecords.get(personalityTheoryTypeId).add(ballotRecord);
            typeTotalVoteCounts.put(personalityTheoryTypeId, typeTotalVoteCounts.get(personalityTheoryTypeId) + ballotRecord.getVoteCount());
        }

        // making nickname
        StringBuilder nicknameStringBuilder = new StringBuilder("");
        for (Map.Entry<Integer, List<BallotRecord>> elem : voteRecords.entrySet()){
            nicknameStringBuilder.append(elem.getValue().get(0).getPersonalityResultType().getName());
            nicknameStringBuilder.append("_");
        }
        if (nicknameStringBuilder.length() > 0) {
            nicknameStringBuilder.deleteCharAt(nicknameStringBuilder.length() - 1);
        }
        else {
            nicknameStringBuilder.append("👽");
        }

        User.DetailResponse userResponse = User.DetailResponse.from(user, voteRecords, typeTotalVoteCounts, nicknameStringBuilder.toString());

        return ApiResponse.success("user", userResponse);
    }
}
