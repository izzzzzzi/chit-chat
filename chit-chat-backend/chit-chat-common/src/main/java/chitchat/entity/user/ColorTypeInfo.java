package chitchat.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@AllArgsConstructor
@Data
@ToString(exclude = "user")
@Entity
@Table(name = "COLOR_TYPE_INFO")
public class ColorTypeInfo {
    @JsonIgnore
    @Id
    @Column(name = "COLOR_TYPE_INFO_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ColorTypeInfoSeq;

    @Column(name = "RED_VOTE_COUNT")
    private Integer redVoteCount;

    @Column(name = "ORANGE_VOTE_COUNT")
    private Integer orangeVoteCount;

    @Column(name = "YELLOW_VOTE_COUNT")
    private Integer yellowVoteCount;

    @Column(name = "GREEN_VOTE_COUNT")
    private Integer greenVoteCount;

    @Column(name = "BLUE_VOTE_COUNT")
    private Integer blueVoteCount;

    @Column(name = "PURPLE_VOTE_COUNT")
    private Integer purpleVoteCount;

    @Column(name = "WHITE_VOTE_COUNT")
    private Integer whiteVoteCount;

    @Column(name = "GREY_VOTE_COUNT")
    private Integer greyVoteCount;

    @Column(name = "BLACK_VOTE_COUNT")
    private Integer blackVoteCount;

    @JsonBackReference
    @OneToOne(mappedBy = "colorTypeInfo")
    private User user;

    public ColorTypeInfo() {
        this.redVoteCount = 0;
        this.orangeVoteCount = 0;
        this.yellowVoteCount = 0;
        this.greenVoteCount = 0;
        this.blueVoteCount = 0;
        this.purpleVoteCount = 0;
        this.whiteVoteCount = 0;
        this.greyVoteCount = 0;
        this.blackVoteCount = 0;
    }
}
