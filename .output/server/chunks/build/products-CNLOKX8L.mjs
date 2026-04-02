const categories = {
  laptops: { name: "Laptops", icon: "laptop" },
  computadoras: { name: "Computadoras", icon: "desktop" },
  perifericos: { name: "Periféricos", icon: "mouse" },
  audio: { name: "Audio", icon: "headphones" },
  monitores: { name: "Monitores", icon: "monitor" },
  almacenamiento: { name: "Almacenamiento", icon: "storage" },
  accesorios: { name: "Accesorios", icon: "cable" },
  "celulares-tablets": { name: "Celulares y Tablets", icon: "mobile" },
  impresion: { name: "Impresión", icon: "printer" },
  redes: { name: "Redes", icon: "wifi" },
  mobiliario: { name: "Mobiliario", icon: "chair" },
  camaras: { name: "Cámaras", icon: "camera" }
};
const productsData = [
  {
    id: 1,
    name: "Laptop Dell XPS 13",
    price: 8500,
    image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9350/pdp/platinum/laptop-xps-13-9350-pdp-module9a.psd?fmt=png-alpha&wid=1080&hei=825",
    stock: 5,
    description: "Laptop ultradelgada con procesador Intel i7, 16GB RAM, 512GB SSD.",
    category: "laptops"
  },
  {
    id: 2,
    name: "Mouse Logitech MX Master",
    price: 450,
    image: "https://www.intelaf.com//images/productos/img_adicionales/wl-log-mxm3sbg/wl-log-mxm3sbg_0301261501516200.webp",
    stock: 12,
    description: "Mouse ergonómico inalámbrico con scroll electromagnético.",
    category: "perifericos"
  },
  {
    id: 3,
    name: "Teclado Mecánico Keychron",
    price: 680,
    image: "https://keychron.com.es/cdn/shop/files/1744964797_0_2048x.png?v=16160164203853431887",
    stock: 3,
    description: "Teclado mecánico 75% con switches Gateron Brown.",
    category: "perifericos"
  },
  {
    id: 4,
    name: "Monitor LG 24”",
    price: 1200,
    image: "https://symcomputadores.com/wp-content/uploads/2024/04/24MR400-B.png",
    stock: 7,
    description: "Monitor Full HD de 24 pulgadas con panel IPS.",
    category: "monitores"
  },
  {
    id: 5,
    name: "Audífonos Sony WH-1000XM4",
    price: 2200,
    image: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_83568145/fee_786_587_png",
    stock: 6,
    description: "Audífonos inalámbricos con cancelación de ruido.",
    category: "audio"
  },
  {
    id: 6,
    name: "Webcam Logitech C920",
    price: 600,
    image: "https://img.pacifiko.com/PROD/resize/0/1000x1000/960-000764_1.png",
    stock: 10,
    description: "Webcam Full HD ideal para videollamadas.",
    category: "perifericos"
  },
  {
    id: 7,
    name: "Disco SSD Samsung 1TB",
    price: 900,
    image: "https://media.flixcar.com/webp/synd-asset/Samsung-81493930-es-870-evo-sata-3-2-5-ssd-mz-77e1t0b-eu-372776309Download-Source-zoom.png",
    stock: 8,
    description: "Unidad SSD de 1TB con alta velocidad de lectura.",
    category: "almacenamiento"
  },
  {
    id: 8,
    name: "Memoria USB 64GB Kingston",
    price: 120,
    image: "https://www.mrpc.com.co/wp-content/uploads/2023/11/10.15.png",
    stock: 20,
    description: "Memoria USB 3.0 de 64GB portátil.",
    category: "almacenamiento"
  },
  {
    id: 9,
    name: "Tablet Samsung Galaxy Tab",
    price: 2500,
    image: "https://media.flixcar.com/webp/synd-asset/Samsung-334898556-latin-galaxy-tab-s10-fe-sm-x526-sm-x520nlbdgto-546315905--Download-Source--zoom.png",
    stock: 4,
    description: "Tablet Android con pantalla de 10 pulgadas.",
    category: "celulares-tablets"
  },
  {
    id: 10,
    name: "Smartphone Xiaomi Redmi Note",
    price: 3200,
    image: "https://www.intelaf.com//images/productos/img_adicionales/cel-xin15p8515n/cel-xin15p8515n_0202261434453680.webp",
    stock: 9,
    description: "Smartphone con excelente relación calidad-precio.",
    category: "celulares-tablets"
  },
  {
    id: 11,
    name: "Impresora HP DeskJet",
    price: 800,
    image: "https://img.pacifiko.com/PROD/resize/1/500x500/YjQ0Zjk2ZT.png",
    stock: 5,
    description: "Impresora multifuncional para hogar.",
    category: "impresion"
  },
  {
    id: 12,
    name: "Router TP-Link",
    price: 350,
    image: "https://crdms.images.consumerreports.org/prod/products/cr/models/404455-wireless-routers-tp-link-ax4400-archer-ax4400-10022465.png",
    stock: 11,
    description: "Router inalámbrico de alta velocidad.",
    category: "redes"
  },
  {
    id: 13,
    name: "Silla Gamer",
    price: 1500,
    image: "https://intech.com.gt/sU/files/articulos/1587483696.png",
    stock: 3,
    description: "Silla ergonómica para largas sesiones.",
    category: "mobiliario"
  },
  {
    id: 14,
    name: "Laptop HP Pavilion",
    price: 6500,
    image: "https://img.pacifiko.com/PROD/resize/0/500x500/3Y7A8LA-1_T1618871127.png",
    stock: 6,
    description: "Laptop potente para trabajo y estudio.",
    category: "laptops"
  },
  {
    id: 15,
    name: "Mouse Gamer Razer",
    price: 500,
    image: "https://i0.wp.com/centralgamer.cl/wp-content/uploads/2025/04/2_1739174183000.png?fit=600%2C600&ssl=1",
    stock: 8,
    description: "Mouse gamer con iluminación RGB.",
    category: "perifericos"
  },
  {
    id: 16,
    name: "Teclado Redragon",
    price: 400,
    image: "https://digitalpc.com.gt/wp-content/uploads/2024/07/1463770_picture_1632489377.webp",
    stock: 10,
    description: "Teclado mecánico económico.",
    category: "perifericos"
  },
  {
    id: 17,
    name: "Monitor Samsung 27”",
    price: 1800,
    image: "https://img.pacifiko.com/PROD/resize/1/500x500/NmI5YjQxYz_1.png",
    stock: 4,
    description: "Monitor 27 pulgadas con excelente resolución.",
    category: "monitores"
  },
  {
    id: 18,
    name: "Bocinas Bluetooth JBL",
    price: 700,
    image: "https://musical.com.gt/wp-content/uploads/JBL_BOOMBOX3_WIFI_HERO_37919_x4.png",
    stock: 7,
    description: "Bocinas portátiles con sonido potente.",
    category: "audio"
  },
  {
    id: 19,
    name: "Cámara Canon EOS",
    price: 5200,
    image: "https://www.cla.canon.com/es_PA/app/images/cameras/eos/EOS_R10/features/EOS-R10_Overview_Image2.png",
    stock: 2,
    description: "Cámara profesional para fotografía.",
    category: "camaras"
  },
  {
    id: 20,
    name: "Power Bank 20000mAh",
    price: 300,
    image: "https://ptron.in/cdn/shop/products/B08SKJT3B1.MAIN.png?v=1618028875",
    stock: 15,
    description: "Batería portátil de alta capacidad.",
    category: "accesorios"
  },
  {
    id: 21,
    name: "Cargador USB-C",
    price: 150,
    image: "https://img.pacifiko.com/PROD/resize/1/500x500/MzAyNDVmOD_340.png",
    stock: 18,
    description: "Cargador rápido compatible con múltiples dispositivos.",
    category: "accesorios"
  },
  {
    id: 22,
    name: "Cable HDMI",
    price: 90,
    image: "https://assets.aten.com/product/category/SubCategory/Cables/HDMI_Cables/SubCategory_Cable_HDMI_True-4K60Hz_NoPadding.png",
    stock: 25,
    description: "Cable HDMI de alta velocidad.",
    category: "accesorios"
  },
  {
    id: 23,
    name: "Soporte para Laptop",
    price: 250,
    image: "https://xtech-frontend.s3.amazonaws.com/media/img/XTA-130_Image_Color.png",
    stock: 9,
    description: "Soporte ergonómico ajustable.",
    category: "accesorios"
  },
  {
    id: 24,
    name: "Disco Duro Externo 2TB",
    price: 950,
    image: "https://proinfoaccesorios.com/wp-content/uploads/2023/11/584_gallery_bl03.png",
    stock: 6,
    description: "Almacenamiento externo portátil.",
    category: "almacenamiento"
  },
  {
    id: 25,
    name: "Smartwatch",
    price: 800,
    image: "https://www.fons.gt/cdn/shop/files/KIESLECTKR3-Negro.png?v=1768406095&width=345",
    stock: 7,
    description: "Reloj inteligente con monitoreo de salud.",
    category: "celulares-tablets"
  },
  {
    id: 26,
    name: "Micrófono USB",
    price: 500,
    image: "https://www.jbl.com.gt/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw8307c6e8/JBL_Quantum_Stream_Studio_ProductImage_Hero.png?sw=535&sh=535",
    stock: 5,
    description: "Micrófono ideal para streaming.",
    category: "audio"
  },
  {
    id: 27,
    name: "Hub USB",
    price: 200,
    image: "https://img.pacifiko.com/PROD/resize/1/500x500/M2NlYWY1N2_1.png",
    stock: 14,
    description: "Expansor de puertos USB.",
    category: "accesorios"
  },
  {
    id: 28,
    name: "Lámpara LED Escritorio",
    price: 180,
    image: "https://xtech-frontend.s3.amazonaws.com/media/img/XTA-701_imagen_color.png",
    stock: 11,
    description: "Lámpara con luz ajustable.",
    category: "mobiliario"
  },
  {
    id: 29,
    name: "Ventilador USB",
    price: 100,
    image: "https://ventasyofertas.com.pe/wp-content/uploads/2026/03/SF-25123-1.png",
    stock: 16,
    description: "Ventilador portátil USB.",
    category: "accesorios"
  },
  {
    id: 30,
    name: "Alfombrilla Gamer",
    price: 120,
    image: "https://media.game.es/COVERV2/3D_L/199/199971.png",
    stock: 13,
    description: "Mousepad grande para gaming.",
    category: "perifericos"
  }
];

export { categories as c, productsData as p };
//# sourceMappingURL=products-CNLOKX8L.mjs.map
