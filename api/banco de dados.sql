create table Users(
	id_user		INTEGER NOT NULL primary key auto_increment,
    descricao	char(10)
);

insert into Users (descricao) values ("ADM");
insert into Users (descricao) values ("USER");


create table casa(
	id_casa		INTEGER NOT NULL primary key auto_increment,
    residencia	varchar(25),
    numero 		varchar(25),
    rua			varchar(25),
    descricao 	varchar(25)
);

insert into casa (residencia, numero, rua, descricao) values ("Casa 01","101",'rua Amazonas','1 sala, 1 cozinha, 2 banheiros, 2 quartos - 190m2');

create table Func(
		id_func			integer not null primary key auto_increment,
		nome_func		varchar(25),
        end_func		varchar(25),
        bairro_func		varchar(25),
        cidade_func		varchar(25),
        cep_func		varchar(10),
        tel_func		varchar(12),
        imagem_func		varchar(50),
        usuario_func varchar(50),
        senha_func varchar(50),
        id_user			int,
        
        foreign key (id_user) references Users(id_user)
);

insert into Func (nome_func, end_func,bairro_func,cidade_func, cep_func, tel_func, imagem_func,usuario_func,senha_func,id_user) values ("fabricio","rua 5","pq do sol","aparecida","12555","1231255911","","fab12","123","1");


create table Morador(
		id_morador		integer not null primary key auto_increment,
        nome_morador	varchar(25),
        sobrenome_morador	varchar(25),
        tel_morador		varchar(12),
        veiculo_morador varchar(25),
        marca_morador varchar(25),
        modelo_morador varchar(25),
        placa_morador varchar(12),
        cor_morador varchar(12),
        id_casa int,     
        imagem_morador	varchar(50),
        usuario_morador varchar(50),
        senha_morador varchar(50),
        id_user			int,
        
        foreign key (id_casa) references casa(id_casa),
        foreign key (id_user) references Users(id_user)
);

insert into Morador (nome_morador, sobrenome_morador,tel_morador,veiculo_morador,marca_morador, modelo_morador, placa_morador,cor_morador,id_casa,imagem_morador,usuario_morador,senha_morador,id_user) 
values ("paulo","pereira","12325599","carro","ford","eco esport 2015","frer12","prata","1","","paulo10","123","1");


create table quiosque(
		id_quiosque		integer not null primary key auto_increment,
        quiosque varchar(30),
        capacidade varchar(5),
        horarioFuncionamento varchar(10)
);
insert into quiosque (quiosque,capacidade,horarioFuncionamento) values ("quiosque 1","80","8h-21h");
insert into quiosque (quiosque,capacidade,horarioFuncionamento) values ("quiosque 2","190","8h-21h");
insert into quiosque (quiosque,capacidade,horarioFuncionamento) values ("quiosque 3","200","8h-21h");

create table reserva_quiosque(
		id_reserva		integer not null primary key auto_increment,
        id_quiosque  int,
        data			char(10),
        hora_inicio		varchar(5),
        hora_fim		varchar(5),
        id_morador		int,
        FOREIGN KEY(id_morador) REFERENCES Morador(id_morador),
        FOREIGN KEY(id_quiosque) REFERENCES quiosque(id_quiosque)
);

insert into reserva_quiosque (id_quiosque,data,hora_inicio,hora_fim,id_morador) values ("1","10/08/2024","8h","21h","1");


create table Sindico(
		id_sindico	INTEGER NOT NULL primary key auto_increment,
		id_morador	int,
		
        foreign key (id_morador) references Morador(id_morador)
	
);	

insert into Sindico (id_morador) values ("1");


create table Visitante(
		id_visitante	integer not null primary key auto_increment,
        nome_visitante	varchar(25),
        tel_visitante	varchar(25),
        veiculo_visit	varchar(25),
        marca_visit	varchar(25),
        modelo_visit	varchar(25),
        placa_visit		varchar(10),
        cor_visit	varchar(25),
        id_morador		int,
        id_func			int,
        
        foreign key (id_morador) references Morador(id_morador),
		foreign key (id_func) references Func(id_func)
);

insert into Visitante (nome_visitante,tel_visitante,veiculo_visit,marca_visit,modelo_visit,placa_visit,cor_visit,id_morador,id_func) 
values ("larissa","12326262","moto","honda","titan 2012","fe20r","preto","1","1");

