package chitchat.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@Data
@ToString(exclude = "user")
@Entity
@Table(name = "ENNEAGRAM_TYPE_INFO")
public class EnneagramTypeInfo {
    @JsonIgnore
    @Id
    @Column(name = "ENNEAGRAM_TYPE_INFO_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long EnneagramTypeInfoSeq;

    @Column(name = "ONE_WING_TWO_VOTE_COUNT")
    private Integer oneWingTwoVoteCount;

    @Column(name = "ONE_WING_NINE_VOTE_COUNT")
    private Integer oneWingNineVoteCount;

    @Column(name = "TWO_WING_ONE_VOTE_COUNT")
    private Integer twoWingOneVoteCount;

    @Column(name = "TWO_WING_THREE_VOTE_COUNT")
    private Integer twoWingThreeVoteCount;

    @Column(name = "THREE_WING_TWO_VOTE_COUNT")
    private Integer threeWingTwoVoteCount;

    @Column(name = "THREE_WING_FOUR_VOTE_COUNT")
    private Integer threeWingFourVoteCount;

    @Column(name = "FOUR_WING_THREE_VOTE_COUNT")
    private Integer fourWing3VoteCount;

    @Column(name = "FOUR_WING_FIVE_VOTE_COUNT")
    private Integer fourWing5VoteCount;

    @Column(name = "FIVE_WING_FOUR_VOTE_COUNT")
    private Integer fiveWingFourVoteCount;

    @Column(name = "FIVE_WING_SIX_VOTE_COUNT")
    private Integer fiveWingSixVoteCount;

    @Column(name = "SIX_WING_FIVE_VOTE_COUNT")
    private Integer sixWingFiveVoteCount;

    @Column(name = "SIX_WING_SEVEN_VOTE_COUNT")
    private Integer sixWingSevenVoteCount;

    @Column(name = "SEVEN_WING_SIX_VOTE_COUNT")
    private Integer sevenWingSixVoteCount;

    @Column(name = "SEVEN_WING_EIGHT_VOTE_COUNT")
    private Integer sevenWingEightVoteCount;

    @Column(name = "EIGHT_WING_SEVEN_VOTE_COUNT")
    private Integer eightWingSevenVoteCount;

    @Column(name = "EIGHT_WING_NINE_VOTE_COUNT")
    private Integer eightWingNineVoteCount;

    @Column(name = "NINE_WING_EIGHT_VOTE_COUNT")
    private Integer nineWingEightVoteCount;

    @Column(name = "NINE_WING_ONE_VOTE_COUNT")
    private Integer nineWingOneVoteCount;

    @JsonBackReference
    @OneToOne(mappedBy = "enneagramTypeInfo")
    private User user;

    public EnneagramTypeInfo() {
        this.oneWingTwoVoteCount = 0;
        this.oneWingNineVoteCount = 0;
        this.twoWingOneVoteCount = 0;
        this.twoWingThreeVoteCount = 0;
        this.threeWingTwoVoteCount = 0;
        this.threeWingFourVoteCount = 0;
        this.fourWing3VoteCount = 0;
        this.fourWing5VoteCount = 0;
        this.fiveWingFourVoteCount = 0;
        this.fiveWingSixVoteCount = 0;
        this.sixWingFiveVoteCount = 0;
        this.sixWingSevenVoteCount = 0;
        this.sevenWingSixVoteCount = 0;
        this.sevenWingEightVoteCount = 0;
        this.eightWingSevenVoteCount = 0;
        this.eightWingNineVoteCount = 0;
        this.nineWingEightVoteCount = 0;
        this.nineWingOneVoteCount = 0;
    }
}
