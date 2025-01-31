PGDMP                      |            db.wo    16.2    16.2 "               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            	           1262    16413    db.wo    DATABASE     ~   CREATE DATABASE "db.wo" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE "db.wo";
                postgres    false            �            1259    16471    akun    TABLE     �   CREATE TABLE public.akun (
    "Id" integer NOT NULL,
    "userName" character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    nama character varying(255),
    alamat character varying(255)
);
    DROP TABLE public.akun;
       public         heap    postgres    false            �            1259    16470    akun_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."akun_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."akun_Id_seq";
       public          postgres    false    216            
           0    0    akun_Id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."akun_Id_seq" OWNED BY public.akun."Id";
          public          postgres    false    215            �            1259    16512    detailproduk    TABLE     �   CREATE TABLE public.detailproduk (
    id integer NOT NULL,
    id_produk integer,
    gambarproduk text,
    kategori character varying(100),
    keterangan character varying(100)
);
     DROP TABLE public.detailproduk;
       public         heap    postgres    false            �            1259    16511    detailproduk_id_seq    SEQUENCE     �   CREATE SEQUENCE public.detailproduk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.detailproduk_id_seq;
       public          postgres    false    220                       0    0    detailproduk_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.detailproduk_id_seq OWNED BY public.detailproduk.id;
          public          postgres    false    219            �            1259    16503    produk    TABLE     s   CREATE TABLE public.produk (
    id integer NOT NULL,
    namapaket text,
    deskripsi text,
    harga integer
);
    DROP TABLE public.produk;
       public         heap    postgres    false            �            1259    16502    produk_id_seq    SEQUENCE     �   CREATE SEQUENCE public.produk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.produk_id_seq;
       public          postgres    false    218                       0    0    produk_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.produk_id_seq OWNED BY public.produk.id;
          public          postgres    false    217            �            1259    16526    riwayatpembelian    TABLE     �   CREATE TABLE public.riwayatpembelian (
    id integer NOT NULL,
    id_produk integer,
    statuspembayaran character varying(100),
    tanggalacara date,
    tanggalbayar date,
    tanggaltransaksi date
);
 $   DROP TABLE public.riwayatpembelian;
       public         heap    postgres    false            �            1259    16525    riwayatpembelian_id_seq    SEQUENCE     �   CREATE SEQUENCE public.riwayatpembelian_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.riwayatpembelian_id_seq;
       public          postgres    false    222                       0    0    riwayatpembelian_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.riwayatpembelian_id_seq OWNED BY public.riwayatpembelian.id;
          public          postgres    false    221            _           2604    16474    akun Id    DEFAULT     f   ALTER TABLE ONLY public.akun ALTER COLUMN "Id" SET DEFAULT nextval('public."akun_Id_seq"'::regclass);
 8   ALTER TABLE public.akun ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    216    215    216            a           2604    16515    detailproduk id    DEFAULT     r   ALTER TABLE ONLY public.detailproduk ALTER COLUMN id SET DEFAULT nextval('public.detailproduk_id_seq'::regclass);
 >   ALTER TABLE public.detailproduk ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            `           2604    16506 	   produk id    DEFAULT     f   ALTER TABLE ONLY public.produk ALTER COLUMN id SET DEFAULT nextval('public.produk_id_seq'::regclass);
 8   ALTER TABLE public.produk ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            b           2604    16529    riwayatpembelian id    DEFAULT     z   ALTER TABLE ONLY public.riwayatpembelian ALTER COLUMN id SET DEFAULT nextval('public.riwayatpembelian_id_seq'::regclass);
 B   ALTER TABLE public.riwayatpembelian ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �          0    16471    akun 
   TABLE DATA           H   COPY public.akun ("Id", "userName", password, nama, alamat) FROM stdin;
    public          postgres    false    216   v%                 0    16512    detailproduk 
   TABLE DATA           Y   COPY public.detailproduk (id, id_produk, gambarproduk, kategori, keterangan) FROM stdin;
    public          postgres    false    220   �&       �          0    16503    produk 
   TABLE DATA           A   COPY public.produk (id, namapaket, deskripsi, harga) FROM stdin;
    public          postgres    false    218   �(                 0    16526    riwayatpembelian 
   TABLE DATA           y   COPY public.riwayatpembelian (id, id_produk, statuspembayaran, tanggalacara, tanggalbayar, tanggaltransaksi) FROM stdin;
    public          postgres    false    222   !)                  0    0    akun_Id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."akun_Id_seq"', 5, true);
          public          postgres    false    215                       0    0    detailproduk_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.detailproduk_id_seq', 16, true);
          public          postgres    false    219                       0    0    produk_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.produk_id_seq', 2, true);
          public          postgres    false    217                       0    0    riwayatpembelian_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.riwayatpembelian_id_seq', 38, true);
          public          postgres    false    221            d           2606    16478    akun akun_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.akun
    ADD CONSTRAINT akun_pkey PRIMARY KEY ("Id");
 8   ALTER TABLE ONLY public.akun DROP CONSTRAINT akun_pkey;
       public            postgres    false    216            h           2606    16519    detailproduk detailproduk_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.detailproduk
    ADD CONSTRAINT detailproduk_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.detailproduk DROP CONSTRAINT detailproduk_pkey;
       public            postgres    false    220            f           2606    16510    produk produk_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.produk
    ADD CONSTRAINT produk_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.produk DROP CONSTRAINT produk_pkey;
       public            postgres    false    218            j           2606    16531 &   riwayatpembelian riwayatpembelian_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.riwayatpembelian
    ADD CONSTRAINT riwayatpembelian_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.riwayatpembelian DROP CONSTRAINT riwayatpembelian_pkey;
       public            postgres    false    222            k           2606    16520 (   detailproduk detailproduk_id_produk_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detailproduk
    ADD CONSTRAINT detailproduk_id_produk_fkey FOREIGN KEY (id_produk) REFERENCES public.produk(id);
 R   ALTER TABLE ONLY public.detailproduk DROP CONSTRAINT detailproduk_id_produk_fkey;
       public          postgres    false    220    218    4710            l           2606    16532 0   riwayatpembelian riwayatpembelian_id_produk_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.riwayatpembelian
    ADD CONSTRAINT riwayatpembelian_id_produk_fkey FOREIGN KEY (id_produk) REFERENCES public.produk(id);
 Z   ALTER TABLE ONLY public.riwayatpembelian DROP CONSTRAINT riwayatpembelian_id_produk_fkey;
       public          postgres    false    222    4710    218            �     x�=�Ko�@�����p �K�H@S$�� ��A�/���{r6O>Ɓ��)��0<�>�G ��ޡHZ�؈�	���M�Ⱦfԡ���!��x�h���3>���jR�ӁQ���|��?�X�J�]�ۻ�Y$��w���3|����l�FYL[.�cO��~hf�f�H_�3PyI��u���xk؅�eb���5���Z��(y�;Y�'۞s+,�_�3p�Z�D�-�����V(��&2<3��n<e>�����R[��\jpuV���6! iY��OB���n�         �  x���ݎ�0�����lCB�ԪK����T	M�$x�ؑ�h�>}�dե�덥���>�#�J���ˠ�!0���*�[�Ӿ�*�3!�>׆��НuS�?J�;`sRZ|��s0�C^����r�����;��v6tRm�������@��t�^э�@�����rk��ޔ�Ԯ�R(�0�/��o^z7��l�pz�	�;�4���j�j�~��79%/}~J��|h-�!sAt��$�Z���{���x�e����$x�L~�B,��ϊ
���׫�6�jp��!t��y!�b����B� *˥�Y�%E�ev��n�Pb����IIO,�r)��B��+�̓x��0y�Õ�hJ�M��\{�;�{�f�O$��Ֆ�{t����p���a�j0�-��:�:�>��m������>��#��-��W��ir�#�zH�����e���ɗ�p��~Nc�U�s      �   |   x����B1�I. !��%JV`��l��	���w5;���F�]����r/]H�(V؁Ro�d�)3���A(�FE^ ��֞�v�	����!�j�^�hp���v��g����ߏ��*�Y�         �   x�u�;1D��]��ɿ�4��TܞT�N<]�<Yc�8�M����_��K����$�z{������@ax���W<�^,\����i�f����&�	�`���O0�3M0�f�	������j�/�s�i�U�"\ڑ��a�2TY{1L¸`�,,����o5�)oW���4�b��S�]�캍#�Q���m�x���'����9��]��     