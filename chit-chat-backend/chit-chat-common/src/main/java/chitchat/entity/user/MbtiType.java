package chitchat.entity.user;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MBTI")
public class MBTI {
    @Column(name = "ISTJ")
    private Long ISTJ;

    @Column(name = "INTJ")
    private Long INTJ;

    @Column(name = "ISFJ")
    private Long ISFJ;

    @Column(name = "ISFP")
    private Long ISFP;

    @Column(name = "ISTP")
    private Long ISTP;

    @Column(name = "INFJ")
    private Long INFJ;

    @Column(name = "INTP")
    private Long INTP;

    @Column(name = "INFP")
    private Long INFP;

    @Column(name = "ESFP")
    private Long ESFP;

    @Column(name = "ESTP")
    private Long ESTP;

    @Column(name = "ESTJ")
    private Long ESTJ;

    @Column(name = "ESFJ")
    private Long ESFJ;

    @Column(name = "ENFJ")
    private Long ENFJ;

    @Column(name = "ENFP")
    private Long ENFP;

    @Column(name = "ENTP")
    private Long ENTP;

    @Column(name = "ENTJ")
    private Long ENTJ;

}
