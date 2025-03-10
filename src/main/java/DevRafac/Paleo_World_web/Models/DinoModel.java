package DevRafac.Paleo_World_web.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "dinossauros")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DinoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nome;

    private String periodo;

    private String dieta;

    private Double comprimento;

    private Double altura;

}
