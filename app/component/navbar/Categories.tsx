'use client';

import React from 'react';
import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import CategoryBox from './CategoryBox';
import { MdOutlineVilla } from 'react-icons/md';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'this property has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'this property is modern!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'this property is in the Countryside!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'this property has a Pools!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'this property is on a island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'this property is close to a Lake!',
  },
  {
    label: 'Sking',
    icon: FaSkiing,
    description: 'this property has skiing activities!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'this property is in a Castles!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'this property has camping activities!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'this property has camping activities!',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'this property is in the cave!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'this property is in the desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'this property is in the barn!',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'this property is luxurious!',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname == '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto ">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category == item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
