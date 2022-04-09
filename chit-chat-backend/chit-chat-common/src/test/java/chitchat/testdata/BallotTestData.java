package chitchat.testdata;

import chitchat.entity.user.User;
import chitchat.oauth.entity.ProviderType;
import chitchat.oauth.entity.RoleType;

import java.time.LocalDateTime;

public class BallotTestData {
    public static final User ballotFromUser = new User(
            "1",
            "James",
            "James@test.com",
            "Y",
            "james_profile_image_url",
            ProviderType.GOOGLE,
            RoleType.GUEST,
            LocalDateTime.now(),
            LocalDateTime.now()
    );
    public static final User ballotToUser = new User(
            "2",
            "Paul",
            "Paul@test.com",
            "Y",
            "paul_profile_image_url",
            ProviderType.GOOGLE,
            RoleType.GUEST,
            LocalDateTime.now(),
            LocalDateTime.now()
    );
}
