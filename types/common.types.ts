import { User, Session } from "next-auth";

export type FormState = {
  title: string;
  description: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface Product {
  supply: any;
  id: string;
  name: string;
  price: number;
  description: string;
  seller_name: string;
  seller_id: string;
}

export interface SessionInterface extends Session {
  user?: User & {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone_number: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}
