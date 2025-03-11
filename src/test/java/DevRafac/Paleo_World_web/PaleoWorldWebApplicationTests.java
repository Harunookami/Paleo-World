package DevRafac.Paleo_World_web;

import DevRafac.Paleo_World_web.DTO.DinoDTO;
import DevRafac.Paleo_World_web.Models.DinoModel;
import DevRafac.Paleo_World_web.Services.DinoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.is;

@SpringBootTest
@AutoConfigureMockMvc
class PaleoWorldWebApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DinoService dinoService;

    @Test
    void contextLoads() {
    }

    @Test
    void testCadastrarDinossauro() throws Exception {
        DinoDTO dinoDTO = new DinoDTO("Deno", "Cretacio", "Arroz e Feijão", 3.0, 1.6);

        mockMvc.perform(post("/dinos/cadastrar")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nome\":\"Deno\",\"periodo\":\"Cretacio\",\"dieta\":\"Arroz e Feijão\",\"comprimento\":3.0,\"altura\":1.6}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome", is(dinoDTO.nome())))
                .andExpect(jsonPath("$.periodo", is(dinoDTO.periodo())))
                .andExpect(jsonPath("$.dieta", is(dinoDTO.dieta())))
                .andExpect(jsonPath("$.comprimento", is(dinoDTO.comprimento())))
                .andExpect(jsonPath("$.altura", is(dinoDTO.altura())));
    }
}