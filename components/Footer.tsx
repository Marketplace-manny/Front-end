import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ColumnProps = {
  title: string;
  links: string[];
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="flex-1 flex flex-col gap-3 text-sm min-w-max">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="flexStart flex-col lg:px-20 py-6 px-5 w-full gap-20 bg-light-white">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <p className="text-2xl font-bold text-orange-800">Logo</p>
          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            MarketPlaceManny is a platform for buying and selling services and
            products.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />{" "}
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>
          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />

          <FooterColumn
            title={footerLinks[4].title}
            links={footerLinks[4].links}
          />
        </div>
      </div>
      <div className="flexBetween max-sm:flex-col w-full text-sm font-normal">
        <p>
          © {new Date().getFullYear()} MarketPlaceManny. All rights reserved.
        </p>
        <p className="text-gray">
          <span className="text-black font-semibold">10,400</span> products
          listed
        </p>
      </div>
    </footer>
  );
};

export default Footer;
