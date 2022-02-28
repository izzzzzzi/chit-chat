package chitchat.repository;

import chitchat.entity.ballot.Ballot;
import chitchat.entity.user.BallotRecord;
import chitchat.entity.user.User;
import chitchat.enums.PersonalityTheoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BallotRepository extends JpaRepository<Ballot, Long> {
    Optional<Ballot> findByBallotFromAndBallotToAndPersonalityTheoryType(User ballotFrom, User ballotTo, PersonalityTheoryType personalityTheoryType);

    @Query(
            "SELECT new chitchat.entity.user.BallotRecord(" +
            "b.personalityResultType," +
            "COUNT(b.personalityResultType)) " +
            "FROM Ballot AS b " +
            "WHERE b.ballotTo = :user " +
            "GROUP BY b.personalityResultType " +
            "ORDER BY b.personalityResultType DESC"
    )
    List<BallotRecord> findWhoVote(@Param("user") User user);
}
