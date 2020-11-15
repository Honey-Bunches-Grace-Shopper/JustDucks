const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')

const products = [
  {
    name: 'Scrooge McDuck',
    price: 4.95,
    quantity: 2,
    description: 'Apples ducks straw, quail a ostriches donkey',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51VXgNZFIoL._AC_SL1424_.jpg',
    helpfulness: 1
  },
  {
    name: 'Huey Duck',
    price: 6.32,
    quantity: 5,
    description: 'Goose hammers cattle rats in crows',
    imageUrl:
      'https://www.smilemakers.com/media/catalog/product/cache/c29ebedb4f4eb19dadc07843c1e972ce/H/O/HOL1062.jpg',
    helpfulness: 4
  },
  {
    name: 'Bentina Beakley',
    price: 25.62,
    quantity: 1,
    description: 'Sheep. Forage Harvester, bean an',

    helpfulness: 3
  },
  {
    name: 'Duckworth the Butler',
    price: 39.42,
    quantity: 2,
    description: ' Coo with rabbits ect.',
    imageUrl:
      'https://imgprd19.hobbylobby.com/3/58/ee/358ee24d0084297774e8e38ca5511ba64d15d664/700Wx700H-236927-0419.jpg',
    helpfulness: 2
  },
  {
    name: 'Bigtime Beagle',
    price: 6.55,
    quantity: 3,
    description: 'Bean prairie dogs nails at est. ',

    helpfulness: 1
  },
  {
    name: 'Burger Beagle',
    price: 4.65,
    quantity: 4,
    description: 'Metal. Apples ducks straw, q',
    imageUrl: 'https://ihfiles.com/products/64/26859/p/4/522808.jpeg',
    helpfulness: 5
  },
  {
    name: 'Bouncer Beagle',
    price: 543.43,
    quantity: 5,
    description: 'Garden windmill chicks',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/coloured-rubber-ducks-royalty-free-image-1586856701.jpg?crop=1.00xw:0.777xh;0,0.155xh&resize=1200:*',
    helpfulness: 3
  },
  {
    name: 'Flintheart Glomgold',
    price: 66.66,
    quantity: 6,
    description: 'armers market and cultivator ostrich. ',
    imageUrl:
      'https://www.getdigital.eu/web/getdigital/gfx/products/__generated__resized/1100x1100/12889ente.jpg',
    helpfulness: 4
  },
  {
    name: 'Magica De Spell',
    price: 4.32,
    quantity: 7,
    description: ' Peacocks baa ostr',
    imageUrl:
      'https://www.partypalooza.com/Merchant2/graphics/00000001/mermaidsducksFE.jpg',
    helpfulness: 4
  },
  {
    name: 'Dewey Duck',
    price: 5.43,
    quantity: 8,
    description: 't, raccoons rhubarb outhouse a',
    imageUrl:
      'https://www.universitysupplystore.com/outerweb/product_images/13251840l.jpg',
    helpfulness: 3
  },
  {
    name: 'Louie Duck',
    price: 1.11,
    quantity: 9,
    description: 'Baa potato donkey mouse',
    imageUrl:
      'https://www.qualitylogoproducts.com/toys-and-fun/matte-rubber-ducks-hq.jpg',
    helpfulness: 4
  },
  {
    name: 'Webby Vanderquack',
    price: 6.66,
    quantity: 10,
    description: '. bull bowels ',

    helpfulness: 5
  },
  {
    name: 'Launchpad McQuack',
    price: 3.21,
    quantity: 0,
    description: 'ad with kale augers ha',
    imageUrl:
      'https://static1.squarespace.com/static/53208ff6e4b00fbb0f1c2d65/533088f1e4b017ad58855af2/5c69ca397817f7d0df538357/1589148058066/?format=1500w',
    helpfulness: 4
  },
  {
    name: 'Gyro Gearloose',
    price: 4.44,
    quantity: 2,
    description: ', cultivator brussel sprouts harrow',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0115/4891/7819/products/23213_Rubber_Duck_Sea_Turtle_67063c07-f8d2-427a-bea0-5dc5e019424c_grande.jpg?v=1557903343',
    helpfulness: 3
  },
  {
    name: 'Baggy Beagle',
    price: 0.99,
    quantity: 1,
    description: 'irp. Veterinarian at Seeder eggs with wate',
    imageUrl:
      'https://s3.distributorcentral.com/uploads/6/1/6172FA6BE110D08BC61F6307A7E71B3C.jpg',
    helpfulness: 2
  },
  {
    name: 'Mrs. Featherby',
    price: 6.43,
    quantity: 5,
    description: 'crows doggies frogs crickets ch',
    imageUrl:
      'https://d1wwyfhxuarwk4.cloudfront.net/images/products/xl/6002a12dbb8fd002f6693f893c613438e6761.jpg',
    helpfulness: 5
  },
  {
    name: 'Mrs. Quackfaster',
    price: 9.99,
    quantity: 22,
    description: 'k. Coo with rabbits ect. ',

    helpfulness: 4
  },
  {
    name: 'Ma Beagle',
    price: 8.43,
    quantity: 43,
    description: 'Petting zoo bulls, ',

    helpfulness: 5
  },
  {
    name: 'Goldie OGilt',
    price: 43.33,
    quantity: 32,
    description: ' Killer scourge scared, ',

    helpfulness: 3
  },
  {
    name: 'Donald Duck',
    price: 444.33,
    quantity: 44,
    description: 'Baa potato donkey mouse, ',

    helpfulness: 3
  },
  {
    name: 'Doofus Drake',
    price: 33.33,
    quantity: 43,
    description: 'Shovels at rakes plows. Turkey d',

    helpfulness: 3
  },
  {
    name: 'Ludwig Von Drake',
    price: 22.22,
    quantity: 11,
    description: '',

    helpfulness: 1
  },
  {
    name: 'Gladstone Gander',
    price: 1.11,
    quantity: 43,
    description: '',

    helpfulness: 4
  },
  {
    name: 'Fergus McDuck',
    price: 43.21,
    quantity: 33,
    description: '',

    helpfulness: 3
  },
  {
    name: 'Downy McDuck',
    price: 21.21,
    quantity: 55,
    description: '',

    helpfulness: 2
  },
  {
    name: 'Bankjob Beagle',
    price: 2.22,
    quantity: 2,
    description: '',

    helpfulness: 4
  },
  {
    name: 'Babyface Beagle',
    price: 0.89,
    quantity: 33,
    description: '',

    helpfulness: 1
  },
  {
    name: 'Bugle Beagle',
    price: 5.65,
    quantity: 77,
    description: '',

    helpfulness: 3
  },
  {
    name: 'Admiral Grimitz',
    price: 99.99,
    quantity: 43,
    description: '',

    helpfulness: 1
  },
  {
    name: 'Poe',
    price: 11.11,
    quantity: 33,
    description: '',

    helpfulness: 2
  },
  {
    name: 'Fenton Crackshell',
    price: 98.78,
    quantity: 13,
    description: '',

    helpfulness: 5
  },
  {
    name: 'Cabrera',
    price: 32.32,
    quantity: 111,
    description: '',

    helpfulness: 3
  },
  {
    name: 'Bubba the Caveduck',
    price: 45.54,
    quantity: 666,
    description: '',

    helpfulness: 2
  },
  {
    name: 'Faris Djinn',
    price: 3.33,
    quantity: 111,
    description: '',

    helpfulness: 5
  },
  {
    name: 'Dijon',
    price: 22.22,
    quantity: 3231,
    description: '',

    helpfulness: 4
  },
  {
    name: 'MMa Crackshell',
    price: 43.43,
    quantity: 11,
    description: '',

    helpfulness: 2
  },
  {
    name: 'MMa Cabrera',
    price: 22.22,
    quantity: 0,
    description: '',

    helpfulness: 5
  },
  {
    name: 'Gandra Dee',
    price: 31.31,
    quantity: 44,
    description: '',

    helpfulness: 1
  },
  {
    name: 'Gene the Genie',
    price: 45.45,
    quantity: 22,
    description: '',

    helpfulness: 3
  },
  {
    name: 'Phantom Blot',
    price: 444.44,
    quantity: 33,
    description: '',
    imageUrl:
      'https://images.homedepot-static.com/productImages/40421d7b-1fc2-422a-9caf-5d2fe835d743/svn/amscan-seasonal-decorations-390466-64_1000.jpg',
    helpfulness: 1
  },
  {
    name: 'Della Duck',
    price: 2121.21,
    quantity: 11,
    description: '',
    imageUrl: 'https://www.mastgeneralstore.com/prodimages/54042-DEFAULT-l.jpg',
    helpfulness: 2
  },
  {
    name: 'Bradford Buzzard',
    price: 32.32,
    quantity: 33,
    description: '',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0506/3177/products/RUD1B_L.jpg?v=1502728398',
    helpfulness: 4
  },
  {
    name: 'Lena De Spell',
    price: 32.32,
    quantity: 22,
    description: '',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/2117/2515/products/SouthCarolinaStateParks_ADI01881_Mermaid_2048x.jpg?v=1574887748',
    helpfulness: 2
  },
  {
    name: 'Bradford Buzz',
    price: 32.32,
    quantity: 44,
    description: '',
    imageUrl:
      'https://shop.hrc.org/media/catalog/product/cache/b96c8ebdd70d2c86125e47f452c01479/h/r/hrc13388.jpg',
    helpfulness: 1
  },
  {
    name: 'Mark Beaks',
    price: 32.32,
    quantity: 111,
    description: '',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0115/4891/7819/products/23204_Rubber_Duck_Giraffe_b8333e8c-2a66-44a2-954e-cf8f99d6fe45_grande.jpg?v=1557902959',
    helpfulness: 3
  },
  {
    name: 'Storkules',
    price: 32.32,
    quantity: 4444,
    description: '',
    imageUrl:
      'https://s7.orientaltrading.com/is/image/OrientalTrading/VIEWER_ZOOM/luau-rubber-duckies~34_1152',
    helpfulness: 2
  },
  {
    name: 'Selene',
    price: 32.32,
    quantity: 333,
    description: '',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51-JQx6aE6L._AC_SL1000_.jpg',
    helpfulness: 1
  },
  {
    name: 'Zeus',
    price: 32.32,
    quantity: 222,
    description: '',
    imageUrl: 'https://s3-prod.rubbernews.com/s3fs-public/Ducks_i.png',
    helpfulness: 4
  },
  {
    name: 'Jim Starling',
    price: 32.32,
    quantity: 111,
    description: '',
    imageUrl:
      'https://i5.walmartimages.com/asr/110a158a-6602-4094-8d94-ac09a8eb1305_1.f03b1e6655ff3d2891110e8c499ef88e.jpeg',
    helpfulness: 5
  },
  {
    name: 'Black Heron',
    price: 32.32,
    quantity: 123,
    description: '',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/8e/Rubber_duckies_So_many_ducks.jpg',
    helpfulness: 2
  },
  {
    name: 'Don Karnage',
    price: 32.32,
    quantity: 321,
    description: '',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0604/4801/products/1_squared.jpg?v=1568680762',
    helpfulness: 5
  },
  {
    name: 'Fethry Duck',
    price: 32.32,
    quantity: 45,
    description: '',
    imageUrl:
      'https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/884/9637/Turquoise-Blue-Rubber-Duck-Adline-7__79869.1568313363.jpg?c=2',
    helpfulness: 4
  },
  {
    name: 'Zan Owlson',
    price: 32.32,
    quantity: 44,
    description: '',
    imageUrl:
      'https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_1000x1000_$&$product=PartyCity/183845',
    helpfulness: 3
  },
  {
    name: 'José Carioca',
    price: 32.32,
    quantity: 232,
    description: '',
    imageUrl:
      'https://lilalu-shop.com/media/image/9b/95/64/lilalu-quietscheente-rubber-duck-franzose-rotwein-baguette-french-wine-seine-eifelturm-eifel-tower_600x600.jpg',
    helpfulness: 2
  },
  {
    name: 'Panchito Pistoles',
    price: 32.32,
    quantity: 3123,
    description: '',
    imageUrl:
      'https://www.amsterdamduckstore.com/wp-content/uploads/2019/12/Green-rubber-duck-front-Amsterdam-Duck-Store.jpg',
    helpfulness: 5
  },
  {
    name: 'Lunaris',
    price: 32.32,
    quantity: 313,
    description: '',
    imageUrl:
      'https://amsterdamduckstore.com/wp-content/uploads/2018/03/Piku-Rubber-Duck-front-Amsterdam-Duck-Store.jpg',
    helpfulness: 4
  },
  {
    name: 'Penumbra',
    price: 32.32,
    quantity: 3123,
    description: '',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51z74FKPX0L._AC_SX425_.jpg',
    helpfulness: 3
  },
  {
    name: 'Violet Sabrewing',
    price: 32.32,
    quantity: 111,
    description: '',
    imageUrl:
      'https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_1000x1000_$&$product=PartyCity/420481',
    helpfulness: 2
  },
  {
    name: 'Drake Mallard',
    price: 32.32,
    quantity: 6546,
    description: '',
    imageUrl:
      'https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/151/9155/Fittnes-Dumbell-Rubber-Duck-Schanables-1__08399.1594131587.jpg?c=2',
    helpfulness: 5
  },
  {
    name: 'Darkwing Duck',
    price: 32.32,
    quantity: 44,
    description: '',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1175/4528/products/rubber-duck-newborn-photo.jpg?v=1561450188',
    helpfulness: 3
  },
  {
    name: 'Steelbeak',
    price: 32.32,
    quantity: 55,
    description: '',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71LgxJzwFKL._SL1500_.jpg',
    helpfulness: 4
  },
  {
    name: 'Daisy Duck',
    price: 32.32,
    quantity: 6,
    description: '',
    imageUrl:
      'https://cdn11.bigcommerce.com/s-jnapaiw/images/stencil/1280x1280/products/2945/4049/Sunny_duck__52036.1400093435.jpg?c=2',
    helpfulness: 3
  }
]

const users = [
  {
    firstName: 'Shanae',
    lastName: 'Glenn',
    email: 'regardAppendix@gmail.com',
    password: 'quackQuack666',
    paymentInfo: '1864474804948568',
    admin: true
  },
  {
    firstName: 'Ellen',
    lastName: 'G',
    email: 'ellen@ellen.com',
    password: '123',
    paymentInfo: '1864474804948568',
    admin: true
  },
  {
    firstName: 'Rosa',
    lastName: 'Ochoa',
    email: 'constituency@gmail.com',
    password: 'waddleWaddle123',
    paymentInfo: '3848032279599710',
    admin: false
  },
  {
    firstName: 'Rylan',
    lastName: 'Mccaffrey',
    email: 'jacketJaw@gmail.com',
    password: 'quackQuack666',
    paymentInfo: '8563810764354135',
    admin: false
  },
  {
    firstName: 'Kaif',
    lastName: 'Hudson',
    email: 'yearnSale@aol.com',
    password: 'waddleWaddle123',
    paymentInfo: '4838608533018024',
    admin: true
  },
  {
    firstName: 'Mirza',
    lastName: 'Samuels',
    email: 'excuseMe@gmail.com',
    password: 'quackQuack666',
    paymentInfo: '3556811153480220',
    admin: false
  },
  {
    firstName: 'Rogan',
    lastName: 'Estes',
    email: 'assertiveQuack@gmail.com',
    password: 'waddleWaddle123',
    paymentInfo: '7540041742546773',
    admin: false
  },
  {
    firstName: 'Layla',
    lastName: 'Kim',
    email: '@aol.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '3101019293931610',
    admin: false
  },
  {
    firstName: 'Milo',
    lastName: 'Hardy',
    email: 'stageLeft@gmail.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '3344150670022390',
    admin: false
  },
  {
    firstName: 'Nadine',
    lastName: 'Ventura',
    email: 'systematicPrize@msn.com',
    password: 'quackQuack666',
    paymentInfo: '3638454051070075',
    admin: false
  },
  {
    firstName: 'Kacie',
    lastName: 'Spears',
    email: 'fragrantTruth@gmail.com',
    password: 'waddleWaddle123',
    paymentInfo: '9961850469297616',
    admin: true
  },
  {
    firstName: 'Aamna',
    lastName: 'Walters',
    email: 'videoKing@aol.com',
    password: 'waddleWaddle123',
    paymentInfo: '2776134203133278',
    admin: false
  },
  {
    firstName: 'Mysha',
    lastName: 'Oconnell',
    email: 'woodFigure@msn.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '',
    admin: false
  },
  {
    firstName: 'Sonia',
    lastName: 'Bowers',
    email: 'accentFog@yahoo.com',
    password: 'waddleWaddle123',
    paymentInfo: '5052957621718474',
    admin: false
  },
  {
    firstName: 'Teddie',
    lastName: 'Humphries',
    email: 'incredibleGiant@msn.com',
    password: 'quackQuack666',
    paymentInfo: '7817465740925989',
    admin: false
  },
  {
    firstName: 'Roza',
    lastName: 'Holland',
    email: 'unanimousBrain@gmail.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '5411371803068159',
    admin: true
  },
  {
    firstName: 'Zeynep',
    lastName: 'Beck',
    email: 'noBreadForDucks@aol.com',
    password: 'waddleWaddle123',
    paymentInfo: '6675583421304073',
    admin: false
  },
  {
    firstName: 'Emma',
    lastName: 'Arias',
    email: 'breadIsBad@gmail.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '9682273136391399',
    admin: false
  },
  {
    firstName: 'Griff',
    lastName: 'Rosario',
    email: 'compromise@aol.com',
    password: 'waddleWaddle123',
    paymentInfo: '4464575022368275',
    admin: false
  },
  {
    firstName: 'Martha',
    lastName: 'Frye',
    email: 'dismissBread@msn.com',
    password: 'quackQuack666',
    paymentInfo: '7655740288690398',
    admin: false
  },
  {
    firstName: 'Mikolaj',
    lastName: 'Hope',
    email: 'voyageOfDignity@gmail.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '2776134203133278',
    admin: true
  },
  {
    firstName: 'Daniela',
    lastName: 'Sexton',
    email: 'privateAge@msn.com',
    password: 'waddleWaddle123',
    paymentInfo: '9961850469297616',
    admin: false
  },
  {
    firstName: 'Nevaeh',
    lastName: 'Hollis',
    email: 'noCompromise@gmail.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '3556811153480220',
    admin: false
  },
  {
    firstName: 'Tj',
    lastName: 'Arnold',
    email: 'registerPace@aol.com',
    password: 'quackQuack666',
    paymentInfo: '3638454051070075',
    admin: false
  },
  {
    firstName: 'Kairon',
    lastName: 'Cantu',
    email: 'snowInfection@yahoo.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '6539953862480513',
    admin: false
  },
  {
    firstName: 'Brennan',
    lastName: 'Wilkinson',
    email: 'dollSkin@msn.com',
    password: 'waddleWaddle123',
    paymentInfo: '5360761115550134',
    admin: true
  },
  {
    firstName: 'Dev',
    lastName: 'Rowland',
    email: 'spiderJelly@aol.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '4464575022368275',
    admin: false
  },
  {
    firstName: 'Jennifer',
    lastName: 'Duffy',
    email: 'dormCousin@msn.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '7540041742546773',
    admin: false
  },
  {
    firstName: 'Kylan',
    lastName: 'Guerra',
    email: 'lieDeny@hotmail.com',
    password: 'quackQuack666',
    paymentInfo: '9065952933039751',
    admin: false
  },
  {
    firstName: 'Gaia',
    lastName: 'Gonzales',
    email: 'personalCrop@msn.com',
    password: 'waddleWaddle123',
    paymentInfo: '3344150670022390',
    admin: true
  },
  {
    firstName: 'Sharna',
    lastName: 'Pearce',
    email: 'misplaceBat@gmail.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '3101019293931610',
    admin: false
  },
  {
    firstName: 'Jayce',
    lastName: 'Mercer',
    email: 'distance@aol.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '4984085040179561',
    admin: false
  },
  {
    firstName: 'Romario',
    lastName: 'Dudley',
    email: 'difficultyPump@gmail.com',
    password: 'quackQuack666',
    paymentInfo: '4110359357548675',
    admin: false
  },
  {
    firstName: 'Esa',
    lastName: 'Beck',
    email: 'womanRock@yahoo.com',
    password: 'waddleWaddle123',
    paymentInfo: '8434720707851105',
    admin: false
  },
  {
    firstName: 'Ronnie',
    lastName: 'Woodcock',
    email: 'effectPoem@msn.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '3081163066580125',
    admin: false
  },
  {
    firstName: 'Charley',
    lastName: 'Buckner',
    email: 'appearToll@hotmail.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '1197686214148825',
    admin: true
  },
  {
    firstName: 'Seb',
    lastName: 'Decker',
    email: 'pardon@msn.com',
    password: 'waddleWaddle123',
    paymentInfo: '8434167424647971',
    admin: false
  },
  {
    firstName: 'Kristie',
    lastName: 'Stubbs',
    email: 'finishWorker@gmail.com',
    password: 'qu8ckQu8ck',
    paymentInfo: '7048829487755819',
    admin: false
  },
  {
    firstName: 'Freddy',
    lastName: 'Berry',
    email: 'categorySwing@gmail.com',
    password: 'quackQuack666',
    paymentInfo: '7178534414046579',
    admin: false
  },
  {
    firstName: 'Monty',
    lastName: 'Rice',
    email: 'archiveMask@yahoo.com',
    password: 'waddleWaddle123',
    paymentInfo: '6085874009254892',
    admin: false
  },
  {
    firstName: 'Sian',
    lastName: 'Sinclair',
    email: 'systemLaborer@gmail.com',
    password: 'quackQuack666',
    paymentInfo: '5673693077565849',
    admin: true
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )

    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )

    console.log('Seeding success!')
    db.close()
  } catch (err) {
    console.error('help! There are no ducks!')
    console.error(err)
    db.close()
  }
}

seed()
