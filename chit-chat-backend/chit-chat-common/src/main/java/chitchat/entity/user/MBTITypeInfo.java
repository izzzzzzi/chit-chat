package chitchat.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@Data
@ToString(exclude = "user")
@Entity
@Table(name = "MBTI_TYPE_INFO")
public class MBTITypeInfo {
    @JsonIgnore
    @Id
    @Column(name = "MBTI_TYPE_INFO_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mbtiTypeInfoSeq;

    @Column(name = "ISTJ_VOTE_COUNT")
    private Integer istjVoteCount;

    @Column(name = "INTJ_VOTE_COUNT")
    private Integer intjVoteCount;

    @Column(name = "ISFJ_VOTE_COUNT")
    private Integer isfjVoteCount;

    @Column(name = "ISFP_VOTE_COUNT")
    private Integer isfpVoteCount;

    @Column(name = "ISTP_VOTE_COUNT")
    private Integer istpVoteCount;

    @Column(name = "INFJ_VOTE_COUNT")
    private Integer infjVoteCount;

    @Column(name = "INTP_VOTE_COUNT")
    private Integer intpVoteCount;

    @Column(name = "INFP_VOTE_COUNT")
    private Integer infpVoteCount;

    @Column(name = "ESFP_VOTE_COUNT")
    private Integer esfpVoteCount;

    @Column(name = "ESTP_VOTE_COUNT")
    private Integer estpVoteCount;

    @Column(name = "ESTJ_VOTE_COUNT")
    private Integer estjVoteCount;

    @Column(name = "ESFJ_VOTE_COUNT")
    private Integer esfjVoteCount;

    @Column(name = "ENFJ_VOTE_COUNT")
    private Integer enfjVoteCount;

    @Column(name = "ENFP_VOTE_COUNT")
    private Integer enfpVoteCount;

    @Column(name = "ENTP_VOTE_COUNT")
    private Integer entpVoteCount;

    @Column(name = "ENTJ_VOTE_COUNT")
    private Integer entjVoteCount;

    @JsonBackReference
    @OneToOne(mappedBy = "mbtiTypeInfo")
    private User user;

    public MBTITypeInfo() {
        this.istjVoteCount = 0;
        this.intjVoteCount = 0;
        this.isfjVoteCount = 0;
        this.isfpVoteCount = 0;
        this.istpVoteCount = 0;
        this.infjVoteCount = 0;
        this.intpVoteCount = 0;
        this.infpVoteCount = 0;
        this.esfpVoteCount = 0;
        this.estpVoteCount = 0;
        this.estjVoteCount = 0;
        this.esfjVoteCount = 0;
        this.enfjVoteCount = 0;
        this.enfpVoteCount = 0;
        this.entpVoteCount = 0;
        this.entjVoteCount = 0;
    }
}
