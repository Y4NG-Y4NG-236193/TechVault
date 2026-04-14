import { Product } from "@/types/product";


export const mockTrendingProducts: Product[] = [
  {
    id: 1,
    name: 'ASUS ROG Zephyrus G14',
    category: 'Gaming Laptops',
    specs: 'RTX 4060 • Ryzen 9 • 16GB RAM',
    rating: 4.9,
    reviews: 214,
    price: '1,899',
    badge: 'Trending',
    image: '/mockdata-laptop/laptop-1.png',
    detailedSpecs: [
      {
        category: 'System Platform',
        items: [
          { label: 'Platform', value: 'AMD Ryzen 9 7940HS' },
          { label: 'Processor', value: '8-core, 16-thread' },
          { label: 'Graphics', value: 'NVIDIA GeForce RTX 4060' },
          { label: 'OS', value: 'Windows 11 Home' }
        ]
      },
      {
        category: 'Visual & Audio',
        items: [
          { label: 'Display', value: '14" QHD+ 165Hz ROG Nebula' },
          { label: 'Audio', value: 'Dolby Atmos, Hi-Res Audio' },
          { label: 'Webcam', value: '1080P FHD IR Camera' }
        ]
      },
      {
        category: 'Storage',
        items: [
          { label: 'Memory', value: '16GB DDR5-4800' },
          { label: 'Storage', value: '1TB PCIe 4.0 NVMe M.2' }
        ]
      },
      {
        category: 'Connectivity',
        items: [
          { label: 'Wi-Fi', value: 'Wi-Fi 6E(802.11ax)' },
          { label: 'Bluetooth', value: 'Version 5.3' },
          { label: 'I/O Ports', value: 'USB4, USB 3.2 Gen 2' }
        ]
      },
      {
        category: 'Battery',
        items: [
          { label: 'Capacity', value: '76WHrs, 4S1P, 4-cell Li-ion' },
          { label: 'Power', value: '240W AC Adapter' }
        ]
      },
      {
        category: 'Security',
        items: [
          { label: 'Fingerprint', value: 'Integrated Power Button' },
          { label: 'TPM', value: 'Firmware TPM' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'MacBook Pro 14" M3',
    category: 'Ultrabooks',
    specs: 'M3 Pro • 18GB RAM • 512GB SSD',
    rating: 4.9,
    reviews: 392,
    price: '2,499',
    badge: 'Bestseller',
    image: '/mockdata-laptop/laptop-2.png',
    detailedSpecs: [
      {
        category: 'System Platform',
        items: [
          { label: 'Platform', value: 'Apple M3 Pro Chip' },
          { label: 'Processor', value: '11-core CPU' },
          { label: 'Graphics', value: '14-core GPU' },
          { label: 'OS', value: 'macOS Sonoma' }
        ]
      },
      {
        category: 'Visual & Audio',
        items: [
          { label: 'Display', value: '14.2" Liquid Retina XDR' },
          { label: 'Audio', value: 'Six-speaker sound system' },
          { label: 'Webcam', value: '1080p FaceTime HD' }
        ]
      },
      {
        category: 'Storage',
        items: [
          { label: 'Memory', value: '18GB Unified Memory' },
          { label: 'Storage', value: '512GB SSD' }
        ]
      },
      {
        category: 'Connectivity',
        items: [
          { label: 'Wi-Fi', value: 'Wi-Fi 6E (802.11ax)' },
          { label: 'Bluetooth', value: 'Bluetooth 5.3' },
          { label: 'I/O Ports', value: 'Thunderbolt 4, HDMI, SDXC' }
        ]
      },
      {
        category: 'Battery',
        items: [
          { label: 'Capacity', value: '70-watt-hour battery' },
          { label: 'Power', value: '70W USB-C Power Adapter' }
        ]
      },
      {
        category: 'Security',
        items: [
          { label: 'Fingerprint', value: 'Touch ID' },
          { label: 'Chip', value: 'Secure Enclave' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Dell XPS 15 OLED',
    category: 'Workstations',
    specs: 'i9-13900H • RTX 4070 • 32GB RAM',
    rating: 4.7,
    reviews: 173,
    price: '2,149',
    badge: 'New',
    image: '/mockdata-laptop/laptop-3.png',
    detailedSpecs: [
      {
        category: 'System Platform',
        items: [
          { label: 'Platform', value: 'Intel Core i9-13900H' },
          { label: 'Processor', value: '14-core, up to 5.4GHz' },
          { label: 'Graphics', value: 'NVIDIA RTX 4070 8GB' },
          { label: 'OS', value: 'Windows 11 Pro' }
        ]
      },
      {
        category: 'Visual & Audio',
        items: [
          { label: 'Display', value: '15.6" 3.5K OLED Touch' },
          { label: 'Audio', value: 'Quad-speaker design' },
          { label: 'Webcam', value: '720p at 30 fps HD' }
        ]
      },
      {
        category: 'Storage',
        items: [
          { label: 'Memory', value: '32GB DDR5-4800' },
          { label: 'Storage', value: '1TB M.2 PCIe NVMe SSD' }
        ]
      },
      {
        category: 'Connectivity',
        items: [
          { label: 'Wi-Fi', value: 'Intel Killer Wi-Fi 6E' },
          { label: 'Bluetooth', value: 'Bluetooth 5.3' },
          { label: 'I/O Ports', value: 'USB-C Thunderbolt 4' }
        ]
      },
      {
        category: 'Battery',
        items: [
          { label: 'Capacity', value: '86Whr Integrated' },
          { label: 'Power', value: '130W Type-C Adapter' }
        ]
      },
      {
        category: 'Security',
        items: [
          { label: 'Fingerprint', value: 'Built-in Power Button' },
          { label: 'TPM', value: 'Discrete TPM 2.0' }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'HP Spectre x360 14',
    category: 'Convertibles',
    specs: 'Core Ultra 7 • OLED Touch • 16GB',
    rating: 4.6,
    reviews: 97,
    price: '1,599',
    badge: 'Sale',
    image: '/mockdata-laptop/laptop-4.png',
    detailedSpecs: [
      {
        category: 'System Platform',
        items: [
          { label: 'Platform', value: 'Intel Core Ultra 7' },
          { label: 'Processor', value: '16-core (6P + 8E + 2LP)' },
          { label: 'Graphics', value: 'Intel Arc Graphics' },
          { label: 'OS', value: 'Windows 11 Home' }
        ]
      },
      {
        category: 'Visual & Audio',
        items: [
          { label: 'Display', value: '14" 2.8K OLED Touchscreen' },
          { label: 'Audio', value: 'Poly Studio, Quad Speakers' },
          { label: 'Webcam', value: '9MP AI Camera' }
        ]
      },
      {
        category: 'Storage',
        items: [
          { label: 'Memory', value: '16GB LPDDR5x-6400' },
          { label: 'Storage', value: '512GB PCIe Gen4 NVMe' }
        ]
      },
      {
        category: 'Connectivity',
        items: [
          { label: 'Wi-Fi', value: 'Intel Wi-Fi 7 BE200' },
          { label: 'Bluetooth', value: 'Bluetooth 5.4' },
          { label: 'I/O Ports', value: 'Thunderbolt 4 Type-C' }
        ]
      },
      {
        category: 'Battery',
        items: [
          { label: 'Capacity', value: '68 Wh Li-ion polymer' },
          { label: 'Power', value: '65W USB Type-C Adapter' }
        ]
      },
      {
        category: 'Security',
        items: [
          { label: 'Fingerprint', value: 'Not integrated' },
          { label: 'Camera', value: 'Camera Privacy Shutter' }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Lenovo ThinkPad X1 Carbon',
    category: 'Business',
    specs: 'Core i7 • 16GB • 1TB SSD',
    rating: 4.8,
    reviews: 118,
    price: '1,749',
    badge: 'New',
    image: '/mockdata-laptop/laptop-4.png',
    detailedSpecs: [
      {
        category: 'System Platform',
        items: [
          { label: 'Platform', value: 'Intel Core i7-1355U' },
          { label: 'Processor', value: '10-core (2P + 8E)' },
          { label: 'Graphics', value: 'Intel Iris Xe' },
          { label: 'OS', value: 'Windows 11 Pro' }
        ]
      },
      {
        category: 'Visual & Audio',
        items: [
          { label: 'Display', value: '14" WUXGA Low Power IPS' },
          { label: 'Audio', value: 'Dolby Atmos Speaker System' },
          { label: 'Webcam', value: '1080p FHD RGB+IR' }
        ]
      },
      {
        category: 'Storage',
        items: [
          { label: 'Memory', value: '16GB LPDDR5-6000' },
          { label: 'Storage', value: '1TB SSD M.2 2280 PCIe' }
        ]
      },
      {
        category: 'Connectivity',
        items: [
          { label: 'Wi-Fi', value: 'Intel Wi-Fi 6E AX211' },
          { label: 'Bluetooth', value: 'Bluetooth 5.1' },
          { label: 'I/O Ports', value: 'USB-C Thunderbolt 4' }
        ]
      },
      {
        category: 'Battery',
        items: [
          { label: 'Capacity', value: '57Wh Integrated' },
          { label: 'Power', value: '65W USB-C Slim Adapter' }
        ]
      },
      {
        category: 'Security',
        items: [
          { label: 'Fingerprint', value: 'Match-on-Chip' },
          { label: 'Privacy', value: 'ThinkShutter' }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'MSI Titan GT77 HX',
    category: 'Gaming Laptops',
    specs: 'RTX 4090 • i9-13980HX • 64GB',
    rating: 5.0,
    reviews: 56,
    price: '3,999',
    badge: 'Premium',
    image: '/mockdata-laptop/laptop-3.png',
    detailedSpecs: [
      {
        category: 'System Platform',
        items: [
          { label: 'Platform', value: 'Intel Core i9-13980HX' },
          { label: 'Processor', value: '24-core, up to 5.6GHz' },
          { label: 'Graphics', value: 'NVIDIA RTX 4090 16GB' },
          { label: 'OS', value: 'Windows 11 Home' }
        ]
      },
      {
        category: 'Visual & Audio',
        items: [
          { label: 'Display', value: '17.3" 4K MiniLED 144Hz' },
          { label: 'Audio', value: 'Dynaudio system' },
          { label: 'Webcam', value: 'IR HD (30fps@720p)' }
        ]
      },
      {
        category: 'Storage',
        items: [
          { label: 'Memory', value: '64GB DDR5 (4 x 16GB)' },
          { label: 'Storage', value: '2TB NVMe PCIe Gen4' }
        ]
      },
      {
        category: 'Connectivity',
        items: [
          { label: 'Wi-Fi', value: 'Killer Wi-Fi 6E AX1690' },
          { label: 'Bluetooth', value: 'Bluetooth 5.3' },
          { label: 'I/O Ports', value: 'Thunderbolt 4, mini DP' }
        ]
      },
      {
        category: 'Battery',
        items: [
          { label: 'Capacity', value: '4-Cell 99.9 Wh' },
          { label: 'Power', value: '330W Adapter' }
        ]
      },
      {
        category: 'Security',
        items: [
          { label: 'Fingerprint', value: 'Yes' },
          { label: 'TPM', value: 'Firmware TPM 2.0' }
        ]
      }
    ]
  },
  {
    id: 7,
    name: 'Razer Blade 16 2024',
    category: 'Gaming Laptops',
    specs: 'RTX 4080 • i9 • 240Hz Mini-LED',
    rating: 4.8,
    reviews: 88,
    price: '2,799',
    badge: 'Trending',
    image: '/mockdata-laptop/laptop-2.png',
    detailedSpecs: [
      {
        category: 'System Platform',
        items: [
          { label: 'Platform', value: 'Intel Core i9-14900HX' },
          { label: 'Processor', value: '24-core, up to 5.8GHz' },
          { label: 'Graphics', value: 'NVIDIA RTX 4080 12GB' },
          { label: 'OS', value: 'Windows 11 Home' }
        ]
      },
      {
        category: 'Visual & Audio',
        items: [
          { label: 'Display', value: '16" QHD+ 240Hz OLED' },
          { label: 'Audio', value: 'THX Spatial Audio' },
          { label: 'Webcam', value: 'Windows Hello 1080p' }
        ]
      },
      {
        category: 'Storage',
        items: [
          { label: 'Memory', value: '32GB DDR5-5600' },
          { label: 'Storage', value: '1TB SSD M.2 NVMe' }
        ]
      },
      {
        category: 'Connectivity',
        items: [
          { label: 'Wi-Fi', value: 'Intel Wi-Fi 7 BE200' },
          { label: 'Bluetooth', value: 'Bluetooth 5.4' },
          { label: 'I/O Ports', value: 'Thunderbolt 4, USB 3.2' }
        ]
      },
      {
        category: 'Battery',
        items: [
          { label: 'Capacity', value: '95.2 Wh Rechargeable' },
          { label: 'Power', value: '330W GaN Adapter' }
        ]
      },
      {
        category: 'Security',
        items: [
          { label: 'Face Recognition', value: 'Windows Hello' },
          { label: 'TPM', value: 'TPM 2.0' }
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'Acer Swift Go 16',
    category: 'Ultrabooks',
    specs: 'Core Ultra 5 • 2.8K OLED • 16GB',
    rating: 4.5,
    reviews: 64,
    price: '1,099',
    badge: 'Sale',
    image: '/mockdata-laptop/laptop-1.png',
    detailedSpecs: [
      {
        category: 'System Platform',
        items: [
          { label: 'Platform', value: 'Intel Core Ultra 5' },
          { label: 'Processor', value: '14-core (4P + 8E + 2LP)' },
          { label: 'Graphics', value: 'Intel Arc Graphics' },
          { label: 'OS', value: 'Windows 11 Home' }
        ]
      },
      {
        category: 'Visual & Audio',
        items: [
          { label: 'Display', value: '16" 3.2K OLED 120Hz' },
          { label: 'Audio', value: 'DTS Audio, Dual Speakers' },
          { label: 'Webcam', value: '1440p QHD Camera' }
        ]
      },
      {
        category: 'Storage',
        items: [
          { label: 'Memory', value: '16GB LPDDR5X' },
          { label: 'Storage', value: '512GB PCIe Gen4 SSD' }
        ]
      },
      {
        category: 'Connectivity',
        items: [
          { label: 'Wi-Fi', value: 'Killer Wi-Fi 6E AX1675' },
          { label: 'Bluetooth', value: 'Bluetooth 5.2' },
          { label: 'I/O Ports', value: 'USB4 Thunderbolt 4' }
        ]
      },
      {
        category: 'Battery',
        items: [
          { label: 'Capacity', value: '65Wh Li-ion' },
          { label: 'Power', value: '100W USB-C Adapter' }
        ]
      },
      {
        category: 'Security',
        items: [
          { label: 'Fingerprint', value: 'Yes' },
          { label: 'TPM', value: 'TPM 2.0' }
        ]
      }
    ]
  },
];


export const fetchTrendingProducts = async (): Promise<Product[]> => {
  // Simulate network delay to mimic real API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTrendingProducts);
    }, 800);
  });
};
