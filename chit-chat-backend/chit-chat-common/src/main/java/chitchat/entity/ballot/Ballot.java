package chitchat.entity.ballot;

import chitchat.entity.user.User;
import chitchat.enums.PersonalityTheoryType;
import chitchat.enums.PersonalityResultType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "ballot")
public class Ballot {
    @JsonIgnore
    @Id
    @Column(name = "ballot_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ballotSeq;

    @NonNull
    @Column(name = "personality_theory_type")
    @Enumerated(EnumType.STRING)
    PersonalityTheoryType personalityTheoryType;

    @NonNull
    @Column(name = "personality_result_type")
    @Enumerated(EnumType.STRING)
    PersonalityResultType personalityResultType;

    @ManyToOne(fetch = FetchType.LAZY)
    @NonNull
    @JoinColumn(name = "ballot_from_user_id")
    User ballotFrom;

    @ManyToOne(fetch = FetchType.LAZY)
    @NonNull
    @JoinColumn(name = "ballot_to_user_id")
    User ballotTo;

    public Ballot(
            @NotNull PersonalityTheoryType personalityTheoryType,
            @NotNull PersonalityResultType personalityResultType,
            @NotNull User ballotFrom,
            @NotNull User ballotTo
    ) {
        this.personalityTheoryType = personalityTheoryType;
        this.personalityResultType = personalityResultType;
        this.ballotFrom = ballotFrom;
        this.ballotTo = ballotTo;
    }

    @Getter
    @Setter
    public static class Request {
        private String ballotFromUserId;
        private String ballotToUserId;
        private PersonalityResultType personalityResultType;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private String ballotFromUserId;
        private String ballotToUserId;
        private PersonalityResultType personalityResultType;

        public static Ballot.Response from(Ballot ballot) {
            return new Ballot.Response(
                    ballot.ballotFrom.getUserId(),
                    ballot.ballotTo.getUserId(),
                    ballot.getPersonalityResultType()
            );
        }
    }
}
