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
@Table(name = "Enneagram")
public class Enneagram {
    @Column(name = "1W2")
    private Long 1W2;

    @Column(name = "1W9")
    private Long 1W9;

    @Column(name = "2W1")
    private Long 2W1;

    @Column(name = "2W3")
    private Long 2W3;

    @Column(name = "3W2")
    private Long 3W2;

    @Column(name = "3W4")
    private Long 3W4;

    @Column(name = "4W3")
    private Long 4W3;

    @Column(name = "4W5")
    private Long 4W5;

    @Column(name = "5W4")
    private Long 5W4;

    @Column(name = "5W6")
    private Long 5W6;

    @Column(name = "6W5")
    private Long 6W5;

    @Column(name = "6W7")
    private Long 6W7;

    @Column(name = "7W6")
    private Long 7W6;

    @Column(name = "7W8")
    private Long 7W8;

    @Column(name = "8W7")
    private Long 8W7;

    @Column(name = "8W9")
    private Long 8W9;

    @Column(name = "9W8")
    private Long 9W8;

    @Column(name = "9W1")
    private Long 9W1;
}
