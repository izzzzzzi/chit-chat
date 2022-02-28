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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        for (BallotRecord ballotRecord : ballotRecords) {
            Integer personalityTheoryTypeId = ballotRecord.getPersonalityResultType().getPersonalityTheoryType().getId();
            if (voteRecords.containsKey(personalityTheoryTypeId) == false) {
                voteRecords.put(personalityTheoryTypeId, new ArrayList<>());
            }
            voteRecords.get(personalityTheoryTypeId).add(ballotRecord);
        }
        User.DetailResponse userDetail = User.DetailResponse.from(user, voteRecords);

        return ApiResponse.success("userDetail", userDetail);
    }
}
