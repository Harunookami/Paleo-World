package DevRafac.Paleo_World_web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class PaleoWorldWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaleoWorldWebApplication.class, args);
	}

	@GetMapping("/api/teste")
	public String teste() {
		return "CONTEUDO AQUI v2 asd";
	}

}
