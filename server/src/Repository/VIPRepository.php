<?php

namespace App\Repository;

use App\Entity\VIP;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method VIP|null find($id, $lockMode = null, $lockVersion = null)
 * @method VIP|null findOneBy(array $criteria, array $orderBy = null)
 * @method VIP[]    findAll()
 * @method VIP[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VIPRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VIP::class);
    }

    // /**
    //  * @return VIP[] Returns an array of VIP objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?VIP
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
