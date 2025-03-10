package DevRafac.Paleo_World_web.Controllers;

import DevRafac.Paleo_World_web.DTO.DinoDTO;
import DevRafac.Paleo_World_web.Models.DinoModel;
import DevRafac.Paleo_World_web.Services.DinoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/dinos")
public class DinoController {

    private final DinoService dinoService;

    public DinoController(DinoService dinoService) {
        this.dinoService = dinoService;
    }

    @PostMapping(value = "/cadastrar")
    public ResponseEntity<?> cadastrarDinossauro (@Validated @RequestBody DinoDTO dinoDTO) {
        try {
            DinoModel cadastrarDino = dinoService.cadastrarDinossauro(dinoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(cadastrarDino);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("erro", "Erro ao cadastrar dinossauro",
                            "detalhes", e.getMessage()));
        }
    }
}
