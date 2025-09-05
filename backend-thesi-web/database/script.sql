-- DROP DAS TABELAS
DROP TABLE IF EXISTS T_PROJETO_CONVITE CASCADE;
DROP TABLE IF EXISTS T_NOTIFICACAO CASCADE;
DROP TABLE IF EXISTS T_SEMIOTICA CASCADE;
DROP TABLE IF EXISTS T_HEURISTICA CASCADE;
DROP TABLE IF EXISTS T_IMAGENS CASCADE;
DROP TABLE IF EXISTS T_PROJETO_USUARIO CASCADE;
DROP TABLE IF EXISTS T_PROJETO CASCADE;
DROP TABLE IF EXISTS T_PROFESSOR CASCADE;
DROP TABLE IF EXISTS T_USUARIO_TOKEN CASCADE;
DROP TABLE IF EXISTS T_USUARIO CASCADE;

-- USUÁRIO
CREATE TABLE T_USUARIO (
    id_usuario SERIAL PRIMARY KEY,
    nm_usuario VARCHAR(200) NOT NULL,
	token_expires_at TIMESTAMP NULL,
    ds_email VARCHAR(200) NOT NULL UNIQUE,
    ds_senha VARCHAR(200) NOT NULL
);
SELECT * FROM T_USUARIO;

CREATE TABLE T_USUARIO_TOKEN (
    id_token SERIAL PRIMARY KEY,
    ds_email VARCHAR(200) NOT NULL,
    nr_token VARCHAR(200) NOT NULL,
    token_expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_usuario_token_email ON t_usuario_token(ds_email);
SELECT * FROM T_USUARIO_TOKEN;

-- PROFESSOR
CREATE TABLE T_PROFESSOR (
    id_professor SERIAL PRIMARY KEY,
    nm_professor VARCHAR(200) NOT NULL,
    nr_telefone VARCHAR(50) NOT NULL,
    ds_email VARCHAR(200) NOT NULL,
    ds_senha VARCHAR(200) NOT NULL
);
SELECT * FROM T_PROFESSOR;
INSERT INTO T_PROFESSOR (id_professor, nm_professor, nr_telefone, ds_email, ds_senha) 
VALUES (1, 'Ana Claudia Melo Tiessi Gomes de Oliveira', '(11)98117-7181', 'ana.oliveira95@fatec.sp.gov.br', 'Professor@Thesi');

-- PROJETO
CREATE TABLE T_PROJETO (
    id_projeto SERIAL PRIMARY KEY,
    id_professor INTEGER REFERENCES T_PROFESSOR(id_professor) DEFAULT 1,
    id_criador INTEGER NOT NULL,
    nm_projeto VARCHAR(200) NOT NULL,
    nm_autores VARCHAR(200),
    st_lixo    BOOLEAN DEFAULT FALSE,
    ds_projeto VARCHAR(200) NOT NULL,
    ds_plataforma VARCHAR(200) DEFAULT 'Web',
    dt_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dt_entrega TIMESTAMP
);
ALTER TABLE T_PROJETO
ADD CONSTRAINT T_PROJETO_FK_CRIADOR FOREIGN KEY (id_criador) REFERENCES T_USUARIO(id_usuario);
SELECT * FROM T_PROJETO;

-- PROJETO_USUARIO
CREATE TABLE T_PROJETO_USUARIO (
    id_projeto INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    ds_status VARCHAR(50) DEFAULT 'em andamento',
    ds_lida BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id_projeto, id_usuario),
    FOREIGN KEY (id_projeto) REFERENCES T_PROJETO(id_projeto),
    FOREIGN KEY (id_usuario) REFERENCES T_USUARIO(id_usuario),
    CONSTRAINT T_PROJETO_USUARIO_CK_DS_STATUS 
        CHECK (ds_status IN ( 
            'em andamento', 
            'atrasado', 
            'entregue', 
	    	'finalizado'
        ))
);
SELECT * FROM T_PROJETO_USUARIO;

-- IMAGENS
CREATE TABLE T_IMAGENS (
    id_imagem SERIAL PRIMARY KEY,
    id_projeto INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    nm_imagem VARCHAR(200) NOT NULL,
    ds_caminho VARCHAR(200) NOT NULL,
    FOREIGN KEY (id_projeto, id_usuario) REFERENCES T_PROJETO_USUARIO(id_projeto, id_usuario)
);
SELECT * FROM T_IMAGENS;

-- HEURISTICA
CREATE TABLE T_HEURISTICA (
    id_heuristica SERIAL PRIMARY KEY, 
    id_projeto INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    nm_heuristica INTEGER NOT NULL,
    ds_problemas VARCHAR(500) NOT NULL,
    ds_recomendacoes VARCHAR(500) NOT NULL,
    nr_severidade INTEGER NOT NULL,
    ds_caminho VARCHAR(500) NOT NULL,
    st_correcao BOOLEAN DEFAULT false,
    FOREIGN KEY (id_projeto, id_usuario) REFERENCES T_PROJETO_USUARIO(id_projeto, id_usuario),
    CONSTRAINT T_HEURISTICA_CK_CD_HEURISTICA 
        CHECK (nm_heuristica IN (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)),
    CONSTRAINT T_HEURISTICA_CK_NR_SEVERIDADE 
        CHECK (nr_severidade IN (1, 2, 3, 4, 5))
);
SELECT * FROM T_HEURISTICA;

-- SEMIOTICA
CREATE TABLE T_SEMIOTICA (
    id_semiotica SERIAL PRIMARY KEY, 
    id_projeto INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    nm_signo VARCHAR(200) NOT NULL,
    ds_esperada VARCHAR(500) NOT NULL,
    ds_possivel VARCHAR(500) NOT NULL,
    ds_quebra VARCHAR(500) NOT NULL,
    ds_recomendacoes VARCHAR(500) NOT NULL,
    ds_caminho VARCHAR(500) NOT NULL,
    st_correcao BOOLEAN DEFAULT false,
    FOREIGN KEY (id_projeto, id_usuario) 
        REFERENCES T_PROJETO_USUARIO(id_projeto, id_usuario),
    CONSTRAINT T_SEMIOTICA_CK_NM_SIGNO CHECK (
        nm_signo IN ('estatico', 'dinamico', 'metalinguistico')
    )
);
SELECT * FROM T_SEMIOTICA;

-- NOTIFICAÇÃO
CREATE TABLE T_NOTIFICACAO (
    id_notificacao SERIAL PRIMARY KEY,
    ds_mensagem VARCHAR(500) NOT NULL,
    ds_link VARCHAR(500) NOT NULL,
    ds_lida BOOLEAN DEFAULT FALSE,
    dt_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    id_projeto INT,
    FOREIGN KEY (id_usuario) REFERENCES T_USUARIO(id_usuario),
    FOREIGN KEY (id_projeto) REFERENCES T_PROJETO(id_projeto)
);
SELECT * FROM T_NOTIFICACAO;

CREATE TABLE T_PROJETO_CONVITE (
    id_convite SERIAL PRIMARY KEY,
    id_projeto INTEGER NOT NULL REFERENCES T_PROJETO(id_projeto),
    id_usuario INTEGER NOT NULL REFERENCES T_USUARIO(id_usuario),
    ds_status VARCHAR(20) DEFAULT 'pendente',
    token VARCHAR(100) NOT NULL,
    dt_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT T_PROJETO_CONVITE_CK_DS_STATUS 
        CHECK (ds_status IN ('pendente', 'aceito', 'recusado'))
);
SELECT * FROM T_PROJETO_CONVITE;

-- TRIGGER: Define data de entrega como uma semana após a criação
CREATE OR REPLACE FUNCTION set_dt_entrega()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.dt_entrega IS NULL THEN
        NEW.dt_entrega := NEW.dt_criacao + INTERVAL '7 days';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_dt_entrega
BEFORE INSERT ON T_PROJETO
FOR EACH ROW
EXECUTE FUNCTION set_dt_entrega();

SELECT * FROM T_PROJETO_CONVITE;
SELECT * FROM T_NOTIFICACAO;
SELECT * FROM T_SEMIOTICA;
SELECT * FROM T_HEURISTICA;
SELECT * FROM T_IMAGENS;
SELECT * FROM T_PROJETO_USUARIO;
SELECT * FROM T_PROJETO;
SELECT * FROM T_PROFESSOR;
SELECT * FROM T_USUARIO;