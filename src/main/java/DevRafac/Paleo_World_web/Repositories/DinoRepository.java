package DevRafac.Paleo_World_web.Repositories;

import DevRafac.Paleo_World_web.Models.DinoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DinoRepository  extends JpaRepository<DinoModel, UUID> {
}
