--
-- PostgreSQL database dump
--

\restrict 5ykYdYfWs6ElanEWrvphsUO70hrNWMoBivKFEdo6f0a14L7ahAGj9NrMPgHdVlO

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-03 23:00:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16411)
-- Name: competence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competence (
    id integer NOT NULL,
    nom character varying(100) NOT NULL
);


ALTER TABLE public.competence OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16410)
-- Name: competence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.competence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.competence_id_seq OWNER TO postgres;

--
-- TOC entry 5141 (class 0 OID 0)
-- Dependencies: 221
-- Name: competence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.competence_id_seq OWNED BY public.competence.id;


--
-- TOC entry 236 (class 1259 OID 16543)
-- Name: conversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversation (
    id integer NOT NULL,
    date_creation timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.conversation OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16542)
-- Name: conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.conversation_id_seq OWNER TO postgres;

--
-- TOC entry 5142 (class 0 OID 0)
-- Dependencies: 235
-- Name: conversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conversation_id_seq OWNED BY public.conversation.id;


--
-- TOC entry 234 (class 1259 OID 16521)
-- Name: correspondance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.correspondance (
    id integer NOT NULL,
    mentor_id integer NOT NULL,
    mentore_id integer NOT NULL,
    score numeric(5,2) NOT NULL,
    date_correspondance timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.correspondance OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16520)
-- Name: correspondance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.correspondance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.correspondance_id_seq OWNER TO postgres;

--
-- TOC entry 5143 (class 0 OID 0)
-- Dependencies: 233
-- Name: correspondance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.correspondance_id_seq OWNED BY public.correspondance.id;


--
-- TOC entry 228 (class 1259 OID 16462)
-- Name: disponibilite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disponibilite (
    id integer NOT NULL,
    utilisateur_id integer NOT NULL,
    jour character varying(20) NOT NULL,
    heure_debut time without time zone NOT NULL,
    heure_fin time without time zone NOT NULL
);


ALTER TABLE public.disponibilite OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16461)
-- Name: disponibilite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disponibilite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.disponibilite_id_seq OWNER TO postgres;

--
-- TOC entry 5144 (class 0 OID 0)
-- Dependencies: 227
-- Name: disponibilite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disponibilite_id_seq OWNED BY public.disponibilite.id;


--
-- TOC entry 240 (class 1259 OID 16572)
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message (
    id integer NOT NULL,
    conversation_id integer NOT NULL,
    expediteur_id integer NOT NULL,
    contenu text NOT NULL,
    date_envoi timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    lu boolean DEFAULT false
);


ALTER TABLE public.message OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16571)
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.message_id_seq OWNER TO postgres;

--
-- TOC entry 5145 (class 0 OID 0)
-- Dependencies: 239
-- Name: message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;


--
-- TOC entry 232 (class 1259 OID 16501)
-- Name: offre_competence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offre_competence (
    id integer NOT NULL,
    offre_id integer NOT NULL,
    competence_id integer NOT NULL
);


ALTER TABLE public.offre_competence OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16500)
-- Name: offre_competence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offre_competence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offre_competence_id_seq OWNER TO postgres;

--
-- TOC entry 5146 (class 0 OID 0)
-- Dependencies: 231
-- Name: offre_competence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offre_competence_id_seq OWNED BY public.offre_competence.id;


--
-- TOC entry 230 (class 1259 OID 16480)
-- Name: offre_mentorat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offre_mentorat (
    id integer NOT NULL,
    utilisateur_id integer NOT NULL,
    type character varying(10) NOT NULL,
    format character varying(20) NOT NULL,
    description text,
    date_publication timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT offre_mentorat_format_check CHECK (((format)::text = ANY ((ARRAY['presentiel'::character varying, 'en ligne'::character varying, 'les deux'::character varying])::text[]))),
    CONSTRAINT offre_mentorat_type_check CHECK (((type)::text = ANY ((ARRAY['offre'::character varying, 'demande'::character varying])::text[])))
);


ALTER TABLE public.offre_mentorat OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16479)
-- Name: offre_mentorat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offre_mentorat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offre_mentorat_id_seq OWNER TO postgres;

--
-- TOC entry 5147 (class 0 OID 0)
-- Dependencies: 229
-- Name: offre_mentorat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offre_mentorat_id_seq OWNED BY public.offre_mentorat.id;


--
-- TOC entry 238 (class 1259 OID 16552)
-- Name: participant_conversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participant_conversation (
    id integer NOT NULL,
    conversation_id integer NOT NULL,
    utilisateur_id integer NOT NULL
);


ALTER TABLE public.participant_conversation OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16551)
-- Name: participant_conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.participant_conversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.participant_conversation_id_seq OWNER TO postgres;

--
-- TOC entry 5148 (class 0 OID 0)
-- Dependencies: 237
-- Name: participant_conversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.participant_conversation_id_seq OWNED BY public.participant_conversation.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    id integer NOT NULL,
    nom character varying(100) NOT NULL,
    prenom character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    telephone character varying(20) NOT NULL,
    mot_de_passe character varying(255) NOT NULL,
    photo_profil character varying(255),
    filiere character varying(100),
    niveau_etudes character varying(50),
    bio text,
    date_inscription timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16422)
-- Name: utilisateur_competence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur_competence (
    id integer NOT NULL,
    utilisateur_id integer NOT NULL,
    competence_id integer NOT NULL
);


ALTER TABLE public.utilisateur_competence OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16421)
-- Name: utilisateur_competence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_competence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.utilisateur_competence_id_seq OWNER TO postgres;

--
-- TOC entry 5149 (class 0 OID 0)
-- Dependencies: 223
-- Name: utilisateur_competence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_competence_id_seq OWNED BY public.utilisateur_competence.id;


--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: utilisateur_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.utilisateur_id_seq OWNER TO postgres;

--
-- TOC entry 5150 (class 0 OID 0)
-- Dependencies: 219
-- Name: utilisateur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;


--
-- TOC entry 226 (class 1259 OID 16442)
-- Name: utilisateur_lacune; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur_lacune (
    id integer NOT NULL,
    utilisateur_id integer NOT NULL,
    competence_id integer NOT NULL
);


ALTER TABLE public.utilisateur_lacune OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16441)
-- Name: utilisateur_lacune_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_lacune_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.utilisateur_lacune_id_seq OWNER TO postgres;

--
-- TOC entry 5151 (class 0 OID 0)
-- Dependencies: 225
-- Name: utilisateur_lacune_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_lacune_id_seq OWNED BY public.utilisateur_lacune.id;


--
-- TOC entry 4908 (class 2604 OID 16414)
-- Name: competence id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence ALTER COLUMN id SET DEFAULT nextval('public.competence_id_seq'::regclass);


--
-- TOC entry 4917 (class 2604 OID 16546)
-- Name: conversation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation ALTER COLUMN id SET DEFAULT nextval('public.conversation_id_seq'::regclass);


--
-- TOC entry 4915 (class 2604 OID 16524)
-- Name: correspondance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.correspondance ALTER COLUMN id SET DEFAULT nextval('public.correspondance_id_seq'::regclass);


--
-- TOC entry 4911 (class 2604 OID 16465)
-- Name: disponibilite id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disponibilite ALTER COLUMN id SET DEFAULT nextval('public.disponibilite_id_seq'::regclass);


--
-- TOC entry 4920 (class 2604 OID 16575)
-- Name: message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);


--
-- TOC entry 4914 (class 2604 OID 16504)
-- Name: offre_competence id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_competence ALTER COLUMN id SET DEFAULT nextval('public.offre_competence_id_seq'::regclass);


--
-- TOC entry 4912 (class 2604 OID 16483)
-- Name: offre_mentorat id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_mentorat ALTER COLUMN id SET DEFAULT nextval('public.offre_mentorat_id_seq'::regclass);


--
-- TOC entry 4919 (class 2604 OID 16555)
-- Name: participant_conversation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participant_conversation ALTER COLUMN id SET DEFAULT nextval('public.participant_conversation_id_seq'::regclass);


--
-- TOC entry 4906 (class 2604 OID 16393)
-- Name: utilisateur id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);


--
-- TOC entry 4909 (class 2604 OID 16425)
-- Name: utilisateur_competence id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_competence ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_competence_id_seq'::regclass);


--
-- TOC entry 4910 (class 2604 OID 16445)
-- Name: utilisateur_lacune id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_lacune ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_lacune_id_seq'::regclass);


--
-- TOC entry 5117 (class 0 OID 16411)
-- Dependencies: 222
-- Data for Name: competence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competence (id, nom) FROM stdin;
\.


--
-- TOC entry 5131 (class 0 OID 16543)
-- Dependencies: 236
-- Data for Name: conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversation (id, date_creation) FROM stdin;
\.


--
-- TOC entry 5129 (class 0 OID 16521)
-- Dependencies: 234
-- Data for Name: correspondance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.correspondance (id, mentor_id, mentore_id, score, date_correspondance) FROM stdin;
\.


--
-- TOC entry 5123 (class 0 OID 16462)
-- Dependencies: 228
-- Data for Name: disponibilite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disponibilite (id, utilisateur_id, jour, heure_debut, heure_fin) FROM stdin;
\.


--
-- TOC entry 5135 (class 0 OID 16572)
-- Dependencies: 240
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message (id, conversation_id, expediteur_id, contenu, date_envoi, lu) FROM stdin;
\.


--
-- TOC entry 5127 (class 0 OID 16501)
-- Dependencies: 232
-- Data for Name: offre_competence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offre_competence (id, offre_id, competence_id) FROM stdin;
\.


--
-- TOC entry 5125 (class 0 OID 16480)
-- Dependencies: 230
-- Data for Name: offre_mentorat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offre_mentorat (id, utilisateur_id, type, format, description, date_publication) FROM stdin;
\.


--
-- TOC entry 5133 (class 0 OID 16552)
-- Dependencies: 238
-- Data for Name: participant_conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.participant_conversation (id, conversation_id, utilisateur_id) FROM stdin;
\.


--
-- TOC entry 5115 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur (id, nom, prenom, email, telephone, mot_de_passe, photo_profil, filiere, niveau_etudes, bio, date_inscription) FROM stdin;
\.


--
-- TOC entry 5119 (class 0 OID 16422)
-- Dependencies: 224
-- Data for Name: utilisateur_competence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur_competence (id, utilisateur_id, competence_id) FROM stdin;
\.


--
-- TOC entry 5121 (class 0 OID 16442)
-- Dependencies: 226
-- Data for Name: utilisateur_lacune; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur_lacune (id, utilisateur_id, competence_id) FROM stdin;
\.


--
-- TOC entry 5152 (class 0 OID 0)
-- Dependencies: 221
-- Name: competence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.competence_id_seq', 1, false);


--
-- TOC entry 5153 (class 0 OID 0)
-- Dependencies: 235
-- Name: conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversation_id_seq', 1, false);


--
-- TOC entry 5154 (class 0 OID 0)
-- Dependencies: 233
-- Name: correspondance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.correspondance_id_seq', 1, false);


--
-- TOC entry 5155 (class 0 OID 0)
-- Dependencies: 227
-- Name: disponibilite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disponibilite_id_seq', 1, false);


--
-- TOC entry 5156 (class 0 OID 0)
-- Dependencies: 239
-- Name: message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_id_seq', 1, false);


--
-- TOC entry 5157 (class 0 OID 0)
-- Dependencies: 231
-- Name: offre_competence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offre_competence_id_seq', 1, false);


--
-- TOC entry 5158 (class 0 OID 0)
-- Dependencies: 229
-- Name: offre_mentorat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offre_mentorat_id_seq', 1, false);


--
-- TOC entry 5159 (class 0 OID 0)
-- Dependencies: 237
-- Name: participant_conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participant_conversation_id_seq', 1, false);


--
-- TOC entry 5160 (class 0 OID 0)
-- Dependencies: 223
-- Name: utilisateur_competence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_competence_id_seq', 1, false);


--
-- TOC entry 5161 (class 0 OID 0)
-- Dependencies: 219
-- Name: utilisateur_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_id_seq', 1, false);


--
-- TOC entry 5162 (class 0 OID 0)
-- Dependencies: 225
-- Name: utilisateur_lacune_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_lacune_id_seq', 1, false);


--
-- TOC entry 4932 (class 2606 OID 16420)
-- Name: competence competence_nom_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence
    ADD CONSTRAINT competence_nom_key UNIQUE (nom);


--
-- TOC entry 4934 (class 2606 OID 16418)
-- Name: competence competence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence
    ADD CONSTRAINT competence_pkey PRIMARY KEY (id);


--
-- TOC entry 4948 (class 2606 OID 16550)
-- Name: conversation conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT conversation_pkey PRIMARY KEY (id);


--
-- TOC entry 4946 (class 2606 OID 16531)
-- Name: correspondance correspondance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.correspondance
    ADD CONSTRAINT correspondance_pkey PRIMARY KEY (id);


--
-- TOC entry 4940 (class 2606 OID 16472)
-- Name: disponibilite disponibilite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disponibilite
    ADD CONSTRAINT disponibilite_pkey PRIMARY KEY (id);


--
-- TOC entry 4952 (class 2606 OID 16585)
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);


--
-- TOC entry 4944 (class 2606 OID 16509)
-- Name: offre_competence offre_competence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_competence
    ADD CONSTRAINT offre_competence_pkey PRIMARY KEY (id);


--
-- TOC entry 4942 (class 2606 OID 16494)
-- Name: offre_mentorat offre_mentorat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_mentorat
    ADD CONSTRAINT offre_mentorat_pkey PRIMARY KEY (id);


--
-- TOC entry 4950 (class 2606 OID 16560)
-- Name: participant_conversation participant_conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participant_conversation
    ADD CONSTRAINT participant_conversation_pkey PRIMARY KEY (id);


--
-- TOC entry 4936 (class 2606 OID 16430)
-- Name: utilisateur_competence utilisateur_competence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_competence
    ADD CONSTRAINT utilisateur_competence_pkey PRIMARY KEY (id);


--
-- TOC entry 4926 (class 2606 OID 16406)
-- Name: utilisateur utilisateur_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_email_key UNIQUE (email);


--
-- TOC entry 4938 (class 2606 OID 16450)
-- Name: utilisateur_lacune utilisateur_lacune_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_lacune
    ADD CONSTRAINT utilisateur_lacune_pkey PRIMARY KEY (id);


--
-- TOC entry 4928 (class 2606 OID 16404)
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);


--
-- TOC entry 4930 (class 2606 OID 16408)
-- Name: utilisateur utilisateur_telephone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_telephone_key UNIQUE (telephone);


--
-- TOC entry 4961 (class 2606 OID 16532)
-- Name: correspondance correspondance_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.correspondance
    ADD CONSTRAINT correspondance_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.utilisateur(id);


--
-- TOC entry 4962 (class 2606 OID 16537)
-- Name: correspondance correspondance_mentore_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.correspondance
    ADD CONSTRAINT correspondance_mentore_id_fkey FOREIGN KEY (mentore_id) REFERENCES public.utilisateur(id);


--
-- TOC entry 4957 (class 2606 OID 16473)
-- Name: disponibilite disponibilite_utilisateur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disponibilite
    ADD CONSTRAINT disponibilite_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES public.utilisateur(id);


--
-- TOC entry 4965 (class 2606 OID 16586)
-- Name: message message_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversation(id);


--
-- TOC entry 4966 (class 2606 OID 16591)
-- Name: message message_expediteur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_expediteur_id_fkey FOREIGN KEY (expediteur_id) REFERENCES public.utilisateur(id);


--
-- TOC entry 4959 (class 2606 OID 16515)
-- Name: offre_competence offre_competence_competence_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_competence
    ADD CONSTRAINT offre_competence_competence_id_fkey FOREIGN KEY (competence_id) REFERENCES public.competence(id);


--
-- TOC entry 4960 (class 2606 OID 16510)
-- Name: offre_competence offre_competence_offre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_competence
    ADD CONSTRAINT offre_competence_offre_id_fkey FOREIGN KEY (offre_id) REFERENCES public.offre_mentorat(id);


--
-- TOC entry 4958 (class 2606 OID 16495)
-- Name: offre_mentorat offre_mentorat_utilisateur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_mentorat
    ADD CONSTRAINT offre_mentorat_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES public.utilisateur(id);


--
-- TOC entry 4963 (class 2606 OID 16561)
-- Name: participant_conversation participant_conversation_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participant_conversation
    ADD CONSTRAINT participant_conversation_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversation(id);


--
-- TOC entry 4964 (class 2606 OID 16566)
-- Name: participant_conversation participant_conversation_utilisateur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participant_conversation
    ADD CONSTRAINT participant_conversation_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES public.utilisateur(id);


--
-- TOC entry 4953 (class 2606 OID 16436)
-- Name: utilisateur_competence utilisateur_competence_competence_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_competence
    ADD CONSTRAINT utilisateur_competence_competence_id_fkey FOREIGN KEY (competence_id) REFERENCES public.competence(id);


--
-- TOC entry 4954 (class 2606 OID 16431)
-- Name: utilisateur_competence utilisateur_competence_utilisateur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_competence
    ADD CONSTRAINT utilisateur_competence_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES public.utilisateur(id);


--
-- TOC entry 4955 (class 2606 OID 16456)
-- Name: utilisateur_lacune utilisateur_lacune_competence_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_lacune
    ADD CONSTRAINT utilisateur_lacune_competence_id_fkey FOREIGN KEY (competence_id) REFERENCES public.competence(id);


--
-- TOC entry 4956 (class 2606 OID 16451)
-- Name: utilisateur_lacune utilisateur_lacune_utilisateur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur_lacune
    ADD CONSTRAINT utilisateur_lacune_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES public.utilisateur(id);


-- Completed on 2026-06-03 23:00:25

--
-- PostgreSQL database dump complete
--

\unrestrict 5ykYdYfWs6ElanEWrvphsUO70hrNWMoBivKFEdo6f0a14L7ahAGj9NrMPgHdVlO

