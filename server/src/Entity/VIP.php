<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VIPRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      collectionOperations = { "get" },
 *      itemOperations = { "get" },
 *      normalizationContext = { "groups" = { "vip:read" } },
 *      denormalizationContext = { "groups" = { "vip:write" } }
 * )
 * @ORM\Entity(repositoryClass=VIPRepository::class)
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
     * 
     * @Groups("vip:read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * 
     * @Groups({"vip:read", "vip:write"})
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=30)
     * 
     * @Groups({"vip:read", "vip:write"})
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     * 
     * @Groups({"vip:read", "vip:write"})
     */
    private $nationalite;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     * 
     * @Groups({"vip:read", "vip:write"})
     */
    private $age;

    /**
     * @ORM\Column(type="string", length=2000, nullable=true)
     * 
     * @Groups({"vip:read", "vip:write"})
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=Suivis::class, mappedBy="vip", orphanRemoval=true)
     * 
     * @Groups({"vip:read"})
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
 * @ORM\Entity
 */
class Joueur extends Vip 
{

    /**
     * @ORM\Column(type="smallint", nullable=true)
     * 
     * @Groups({ "vip:read", "vip:write" })
     */
    private $classementATP;

    public function getClassementATP(): ?int
    {
        return $this->classementATP;
    }

    public function setClassementATP(?int $classementATP): self
    {
        $this->agclassementATPe = $classementATP;

        return $this;
    }
}

/**
 * @ORM\Entity
 */
class Accompagnant extends Vip 
{
}