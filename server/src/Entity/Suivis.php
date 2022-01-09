<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SuivisRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      normalizationContext = { "groups" = { "suivis:read" } },
 *      denormalizationContext = { "groups" = { "suivis:write" } }
 * )
 * @ORM\Entity(repositoryClass=SuivisRepository::class)
 * 
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({"echange" = "Echange", "action" = "Action"})
 */
class Suivis
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * 
     * @Groups({"suivis:read", "vip:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime_immutable")
     * 
     * @Groups({"suivis:read", "vip:read"})
     */
    private $created_at;

    /**
     * @ORM\Column(type="string", length=4000, nullable=true)
     * 
     * @Groups({"suivis:read", "suivis:read", "vip:read"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"suivis:read", "suivis:write", "vip:read"})
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity=Vip::class, inversedBy="suivis")
     * @ORM\JoinColumn(nullable=false)
     */
    private $vip;


    public function __construct()
    {
        $this->setCreatedAt(new \DateTimeImmutable());
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): self
    {
        $this->created_at = $created_at;

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

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getVip(): ?Vip
    {
        return $this->vip;
    }

    public function setVip(?Vip $vip): self
    {
        $this->vip = $vip;

        return $this;
    }

}



/**
 * @ORM\Entity
 */
class Echange extends Suivis 
{

    /**
     * @ORM\Column(type="string", columnDefinition="ENUM('mail', 'tel', 'fax', 'irl')")
     * 
     * @Groups({"suivis:read", "suivis:write", "vip:read"})
     */
    private $sources;
    
    public function getSources(): ?string
    {
        return $this->sources;
    }

    public function setSources(string $sources): self
    {
        $this->sources = $sources;

        return $this;
    }
}



/**
 * @ORM\Entity
 */
class Action extends Suivis 
{

    /**
     * @ORM\Column(type="string", columnDefinition="ENUM('opened', 'closed')")
     * 
     * @Groups({"suivis:read", "suivis:write", "vip:read"})
     */
    private $statut;

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): self
    {
        $this->statut = $statut;

        return $this;
    }
}