PGDMP  +                    |            db.wo    16.2    16.2 )               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16413    db.wo    DATABASE     ~   CREATE DATABASE "db.wo" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE "db.wo";
                postgres    false            �            1259    16471    akun    TABLE     8  CREATE TABLE public.akun (
    "Id" integer NOT NULL,
    "userName" character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    nama character varying(255),
    alamat character varying(255),
    role integer,
    nomor_telepon character varying(255),
    email character varying(255)
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
       public          postgres    false    216                       0    0    akun_Id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."akun_Id_seq" OWNED BY public.akun."Id";
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
       public          postgres    false    220                       0    0    detailproduk_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.detailproduk_id_seq OWNED BY public.detailproduk.id;
          public          postgres    false    219            �            1259    16583    galeri    TABLE     �   CREATE TABLE public.galeri (
    id integer NOT NULL,
    judul character varying(255) NOT NULL,
    deskripsi text NOT NULL,
    tanggal_post date NOT NULL,
    gambar character varying(255)
);
    DROP TABLE public.galeri;
       public         heap    postgres    false            �            1259    16582    galeri_id_seq    SEQUENCE     �   CREATE SEQUENCE public.galeri_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.galeri_id_seq;
       public          postgres    false    224                       0    0    galeri_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.galeri_id_seq OWNED BY public.galeri.id;
          public          postgres    false    223            �            1259    16503    produk    TABLE     �   CREATE TABLE public.produk (
    id integer NOT NULL,
    namapaket text,
    deskripsi text,
    harga integer,
    gambar character varying(255)
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
       public          postgres    false    218                       0    0    produk_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.produk_id_seq OWNED BY public.produk.id;
          public          postgres    false    217            �            1259    16526    riwayatpembelian    TABLE     �   CREATE TABLE public.riwayatpembelian (
    id integer NOT NULL,
    id_produk integer,
    statuspembayaran character varying(100),
    tanggalacara date,
    tanggalbayar date,
    tanggaltransaksi date,
    id_akun integer
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
       public          postgres    false    222                       0    0    riwayatpembelian_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.riwayatpembelian_id_seq OWNED BY public.riwayatpembelian.id;
          public          postgres    false    221            d           2604    16474    akun Id    DEFAULT     f   ALTER TABLE ONLY public.akun ALTER COLUMN "Id" SET DEFAULT nextval('public."akun_Id_seq"'::regclass);
 8   ALTER TABLE public.akun ALTER COLUMN "Id" DROP DEFAULT;
       public          postgres    false    216    215    216            f           2604    16515    detailproduk id    DEFAULT     r   ALTER TABLE ONLY public.detailproduk ALTER COLUMN id SET DEFAULT nextval('public.detailproduk_id_seq'::regclass);
 >   ALTER TABLE public.detailproduk ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            h           2604    16586 	   galeri id    DEFAULT     f   ALTER TABLE ONLY public.galeri ALTER COLUMN id SET DEFAULT nextval('public.galeri_id_seq'::regclass);
 8   ALTER TABLE public.galeri ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            e           2604    16506 	   produk id    DEFAULT     f   ALTER TABLE ONLY public.produk ALTER COLUMN id SET DEFAULT nextval('public.produk_id_seq'::regclass);
 8   ALTER TABLE public.produk ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            g           2604    16529    riwayatpembelian id    DEFAULT     z   ALTER TABLE ONLY public.riwayatpembelian ALTER COLUMN id SET DEFAULT nextval('public.riwayatpembelian_id_seq'::regclass);
 B   ALTER TABLE public.riwayatpembelian ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222                      0    16471    akun 
   TABLE DATA           d   COPY public.akun ("Id", "userName", password, nama, alamat, role, nomor_telepon, email) FROM stdin;
    public          postgres    false    216   �-       	          0    16512    detailproduk 
   TABLE DATA           Y   COPY public.detailproduk (id, id_produk, gambarproduk, kategori, keterangan) FROM stdin;
    public          postgres    false    220   0/                 0    16583    galeri 
   TABLE DATA           L   COPY public.galeri (id, judul, deskripsi, tanggal_post, gambar) FROM stdin;
    public          postgres    false    224   y0                 0    16503    produk 
   TABLE DATA           I   COPY public.produk (id, namapaket, deskripsi, harga, gambar) FROM stdin;
    public          postgres    false    218   �0                 0    16526    riwayatpembelian 
   TABLE DATA           �   COPY public.riwayatpembelian (id, id_produk, statuspembayaran, tanggalacara, tanggalbayar, tanggaltransaksi, id_akun) FROM stdin;
    public          postgres    false    222   1                  0    0    akun_Id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."akun_Id_seq"', 6, true);
          public          postgres    false    215                       0    0    detailproduk_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.detailproduk_id_seq', 20, true);
          public          postgres    false    219                       0    0    galeri_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.galeri_id_seq', 1, false);
          public          postgres    false    223                       0    0    produk_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.produk_id_seq', 5, true);
          public          postgres    false    217                       0    0    riwayatpembelian_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.riwayatpembelian_id_seq', 40, true);
          public          postgres    false    221            j           2606    16478    akun akun_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.akun
    ADD CONSTRAINT akun_pkey PRIMARY KEY ("Id");
 8   ALTER TABLE ONLY public.akun DROP CONSTRAINT akun_pkey;
       public            postgres    false    216            n           2606    16519    detailproduk detailproduk_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.detailproduk
    ADD CONSTRAINT detailproduk_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.detailproduk DROP CONSTRAINT detailproduk_pkey;
       public            postgres    false    220            r           2606    16590    galeri galeri_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.galeri
    ADD CONSTRAINT galeri_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.galeri DROP CONSTRAINT galeri_pkey;
       public            postgres    false    224            l           2606    16510    produk produk_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.produk
    ADD CONSTRAINT produk_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.produk DROP CONSTRAINT produk_pkey;
       public            postgres    false    218            p           2606    16531 &   riwayatpembelian riwayatpembelian_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.riwayatpembelian
    ADD CONSTRAINT riwayatpembelian_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.riwayatpembelian DROP CONSTRAINT riwayatpembelian_pkey;
       public            postgres    false    222            s           2606    16520 (   detailproduk detailproduk_id_produk_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detailproduk
    ADD CONSTRAINT detailproduk_id_produk_fkey FOREIGN KEY (id_produk) REFERENCES public.produk(id);
 R   ALTER TABLE ONLY public.detailproduk DROP CONSTRAINT detailproduk_id_produk_fkey;
       public          postgres    false    218    220    4716            t           2606    16532 0   riwayatpembelian riwayatpembelian_id_produk_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.riwayatpembelian
    ADD CONSTRAINT riwayatpembelian_id_produk_fkey FOREIGN KEY (id_produk) REFERENCES public.produk(id);
 Z   ALTER TABLE ONLY public.riwayatpembelian DROP CONSTRAINT riwayatpembelian_id_produk_fkey;
       public          postgres    false    4716    218    222               w  x�E��n�@�u�^�4�c&�Il�e�@�y5xx���B�JW��8*CG�3.��M��ۆ�nكoN�1XI�
��W:I���O)ME��=�5�	-�q�gy����W�
�l��"�ăU@^���^��N��HM|�� ��;��:�"ٻF���s��Y�?�`� �,��$�iu27�m#����#�����!�t��D���]��2�kT�~_Z ib�6�[Z�;~b7t�q�|0|Ô�ͰC���3߫ϐ�<T������1�����5���-�������ɵ��诓�;�r�t#|ѩ�)�4W[�b������r������HS��� �(�y�'�>x�����H      	   9  x�]P�n� <�W���WOmݤj�XQ�c���4�I�r��_b��������0|���ɸ�1�It��6���N�J�dY�?��-лZ�m	��9��)k��z	H.l<W���wX��4&�zK&��i�&o�;�V�����HkWwm�n��aI�e��˜fD���9�N�-x�z<7z���V_��"�w�۬�(�����k}0}<B<�T�\�[����1�Nc�Y*� ����w��,�Bդ�S.gٔY��t`�)ߊO��T��V�x�b�\p:�L�u`���9�6��I��s            x������ � �         j   x�3�q���H�N-Q 18�M@��������������@/� �ˈ�=�������M!���M�����9�\�B<���R�J29�ДY�������qqq �
!�         :   x�3��4�LJ-�H,���4202�50�5��3̑�f\&�FX4"TY 3͸b���� �3�     