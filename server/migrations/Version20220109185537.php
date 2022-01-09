<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220109185537 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE suivis (id INT AUTO_INCREMENT NOT NULL, vip_id INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', description VARCHAR(4000) DEFAULT NULL, title VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, sources ENUM(\'mail\', \'tel\', \'fax\', \'irl\'), statut ENUM(\'opened\', \'closed\'), INDEX IDX_6627ED70AA4E6FD (vip_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vip (id INT AUTO_INCREMENT NOT NULL, accompagne_id INT NOT NULL, nom VARCHAR(50) NOT NULL, prenom VARCHAR(30) NOT NULL, nationalite VARCHAR(10) DEFAULT NULL, age SMALLINT DEFAULT NULL, description VARCHAR(2000) DEFAULT NULL, type VARCHAR(255) NOT NULL, classement_atp SMALLINT DEFAULT NULL, INDEX IDX_4B076C22E0B1098A (accompagne_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE suivis ADD CONSTRAINT FK_6627ED70AA4E6FD FOREIGN KEY (vip_id) REFERENCES vip (id)');
        $this->addSql('ALTER TABLE vip ADD CONSTRAINT FK_4B076C22E0B1098A FOREIGN KEY (accompagne_id) REFERENCES vip (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE suivis DROP FOREIGN KEY FK_6627ED70AA4E6FD');
        $this->addSql('ALTER TABLE vip DROP FOREIGN KEY FK_4B076C22E0B1098A');
        $this->addSql('DROP TABLE suivis');
        $this->addSql('DROP TABLE vip');
    }
}
