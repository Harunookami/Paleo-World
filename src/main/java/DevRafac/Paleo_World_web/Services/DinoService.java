package DevRafac.Paleo_World_web.Services;

import DevRafac.Paleo_World_web.DTO.DinoDTO;
import DevRafac.Paleo_World_web.Models.DinoModel;
import DevRafac.Paleo_World_web.Repositories.DinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DinoService {

    @Autowired
    private DinoRepository dinoRepository;

    public DinoModel cadastrarDinossauro (DinoDTO dinoDTO){
      try {
          DinoModel dino = new DinoModel(

          UUID.randomUUID(),
          dinoDTO.nome(),
          dinoDTO.dieta(),
          dinoDTO.periodo(),
          dinoDTO.comprimento(),
          dinoDTO.altura()
          );


          return dinoRepository.save(dino);
      } catch (Exception e) {
          throw new RuntimeException("Erro ao cadastrar Espécie." + e.getMessage(), e);
      }
    }

}
