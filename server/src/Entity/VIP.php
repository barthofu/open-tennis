<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ApiResource(
 *      collectionOperations = { "get" },
 *      itemOperations = { "get" }
 * )
 * 
 * @ORM\Entity
 * 
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({"joueur" = "Joueur", "accompagnant" = "Accompagnant"})
 */
class Vip
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     */
    private $nationalite;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     */
    private $age;

    /**
     * @ORM\Column(type="string", length=2000, nullable=true)
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=Suivis::class, mappedBy="vip", orphanRemoval=true)
     * 
     * @ApiSubresource
     */
    private $suivis;

    public function __construct()
    {
        $this->suivis = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNationalite(): ?string
    {
        return $this->nationalite;
    }

    public function setNationalite(?string $nationalite): self
    {
        $this->nationalite = $nationalite;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(?int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|Suivis[]
     */
    public function getSuivis(): Collection
    {
        return $this->suivis;
    }

    public function addSuivi(Suivis $suivi): self
    {
        if (!$this->suivis->contains($suivi)) {
            $this->suivis[] = $suivi;
            $suivi->setVip($this);
        }

        return $this;
    }

    public function removeSuivi(Suivis $suivi): self
    {
        if ($this->suivis->removeElement($suivi)) {
            // set the owning side to null (unless already changed)
            if ($suivi->getVip() === $this) {
                $suivi->setVip(null);
            }
        }

        return $this;
    }
}



/**
 * @ApiResource
 * 
 * @ORM\Entity
 * 
 */
class Joueur extends Vip 
{

    /**
     * @ORM\Column(type="smallint", nullable=true)
     */
    private $classementATP;

    /**
     * @ORM\OneToMany(targetEntity=Accompagnant::class, mappedBy="accompagne", orphanRemoval=true)
     * 
     * @ApiSubresource
     */
    private $accompagnants;

    public function __construct()
    {
        $this->suivis = new ArrayCollection();
    }

    public function getClassementATP(): ?int
    {
        return $this->classementATP;
    }

    public function setClassementATP(?int $classementATP): self
    {
        $this->agclassementATPe = $classementATP;

        return $this;
    }

     /**
     * @return Collection|Accompagnant[]
     */
    public function getAccompagnants(): Collection
    {
        return $this->accompagnants;
    }

    public function addAccompagnant(Accompagnant $accompagnant): self
    {
        if (!$this->accompagnants->contains($accompagnant)) {
            $this->accompagnants[] = $accompagnant;
            $accompagnant->setAccompagne($this);
        }

        return $this;
    }

    public function removeAccompagnant(Accompagnant $accompagnant): self
    {
        if ($this->accompagnants->removeElement($accompagnant)) {
            // set the owning side to null (unless already changed)
            if ($accompagnant->getAccompagne() === $this) {
                $accompagnant->setAccompagne(null);
            }
        }

        return $this;
    }
}



/**
 * @ApiResource
 * 
 * @ORM\Entity
 */
class Accompagnant extends Vip 
{

    /**
     * @ORM\ManyToOne(targetEntity=Joueur::class, inversedBy="accompagnants")
     * @ORM\JoinColumn(nullable=true)
     * 
     * @ApiSubresource
     */
    private $accompagne;

    public function getAccompagne(): ?Joueur
    {
        return $this->accompagne;
    }

    public function setAccompagne(?Joueur $joueur): self
    {
        $this->accompagne = $joueur;

        return $this;
    }
}