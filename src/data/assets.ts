// Central asset references. Local files come from the official SCA site (downloaded
// to /public/assets). Remote images add variety; the <Img> component falls back to a
// local gallery image on error so the demo never shows a broken image.

export const LOGO_SCA = "/assets/logo-sca.svg";
export const HERO_LAMBO = "/assets/hero-lambo.jpg";
export const LOGO_JDM = "/assets/logo-jdm.png";
export const JOSE = "/assets/jose.jpeg";

export const GALLERY = [
  "/assets/galeria-4.jpg",
  "/assets/sca-1.jpg",
  "/assets/sca-9.jpg",
  "/assets/detalhe.jpg",
  "/assets/ambiente.jpeg",
];

export const PARTNER_GFX = [
  "/assets/parceiro-1.png",
  "/assets/parceiro-2.png",
  "/assets/parceiro-3.png",
];

export const FALLBACK_IMG = GALLERY[0];

// Stable Unsplash supercar photos for garages / grids / heroes.
const U = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CARS_IMG = [
  U("1503376780353-7e6692767b70"), // black sports car
  U("1544636331-e26879cd4d9b"), // ferrari red
  U("1492144534655-ae79c964c9d7"), // classic curves
  U("1583121274602-3e2820c69888"), // lamborghini
  U("1525609004556-c46c7d6cf023"), // bmw front
  U("1552519507-da3b142c6e3d"), // orange mclaren
  U("1542362567-b07e54358753"), // mercedes
  U("1494976388531-d1058494cdd8"), // muscle
  U("1568605117036-5fe5e7bab0b7"), // red coupe
  U("1606664515524-ed2f786a0bd6"), // lambo green
  U("1614162692292-7ac56d7f7f1e"), // porsche
  U("1580273916550-e323be2ae537"), // porsche white
  U("1617814076367-b759c7d7e738"), // porsche 911
  U("1611016186353-9af58c69a533"), // audi r8
  U("1600712242805-5f78671b24da"), // ferrari yellow
  U("1502877338535-766e1452684a"), // night car
];

export const carImg = (i: number) => CARS_IMG[i % CARS_IMG.length];

// Varied portrait avatars for the member directory.
export const avatar = (n: number) => `https://i.pravatar.cc/320?img=${(n % 70) + 1}`;
