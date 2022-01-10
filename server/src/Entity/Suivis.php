<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

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
 * @ORM\DiscriminatorMap({"echange" = "Echange", "action" = "Action"})
 */
class Suivis
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer") 
     */
    private $id;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $created_at;

    /**
     * @ORM\Column(type="string", length=4000, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity=Vip::class, inversedBy="suivis")
     * @ORM\JoinColumn(nullable=true)
     * 
     * @ApiSubresource
     */
    private $vip;

    /**
     * @ORM\ManyToOne(targetEntity=Responsable::class, inversedBy="suivis")
     * @ORM\JoinColumn(nullable=false)
     */
    private $responsable;


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

    public function getResponsable(): ?Responsable
    {
        return $this->responsable;
    }

    public function setResponsable(?Responsable $responsable): self
    {
        $this->responsable = $responsable;

        return $this;
    }

}



/**
 * @ApiResource
 * 
 * @ORM\Entity
 */
class Echange extends Suivis 
{

    /**
     * @ORM\Column(type="string", columnDefinition="ENUM('mail', 'tel', 'fax', 'irl')")
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
 * @ApiResource
 * 
 * @ORM\Entity
 */
class Action extends Suivis 
{

    /**
     * @ORM\Column(type="string", columnDefinition="ENUM('opened', 'closed')")
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