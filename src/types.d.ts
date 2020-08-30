export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CategoryOne = {
  __typename?: 'CategoryOne';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  orderOfDisplay?: Maybe<Scalars['Int']>;
};

export type CategoryTwo = {
  __typename?: 'CategoryTwo';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  orderOfDisplay?: Maybe<Scalars['Int']>;
  categoryOne: CategoryOne;
};

export type Filter = {
  __typename?: 'Filter';
  categoriesOne: Array<Maybe<CategoryOne>>;
  categoriesTwo: Array<Maybe<CategoryTwo>>;
  price?: Maybe<Array<Maybe<Scalars['Float']>>>;
  weight?: Maybe<Array<Maybe<Scalars['String']>>>;
  purity?: Maybe<Array<Maybe<Scalars['String']>>>;
  gender?: Maybe<Array<Maybe<Scalars['String']>>>;
  size?: Maybe<Array<Maybe<Scalars['String']>>>;
  booleans?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Misc = {
  __typename?: 'Misc';
  value?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateCategoryOne: CategoryOne;
  deleteCategoryOne?: Maybe<Scalars['Boolean']>;
  updateCategoryTwo: CategoryTwo;
  deleteCategoryTwo?: Maybe<Scalars['Boolean']>;
  updateProduct: Product;
  deleteProduct?: Maybe<Scalars['Boolean']>;
  updateMisc?: Maybe<Misc>;
  updatePassword?: Maybe<Scalars['String']>;
  login?: Maybe<User>;
};


export type MutationUpdateCategoryOneArgs = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  orderOfDisplay?: Maybe<Scalars['Int']>;
};


export type MutationDeleteCategoryOneArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCategoryTwoArgs = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  orderOfDisplay?: Maybe<Scalars['Int']>;
  categoryOne: Scalars['ID'];
};


export type MutationDeleteCategoryTwoArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateProductArgs = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  categoryOne: Scalars['ID'];
  categoryTwo: Scalars['ID'];
  price?: Maybe<Scalars['Float']>;
  favorite?: Maybe<Scalars['Boolean']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  weight?: Maybe<Scalars['String']>;
  grossWeight?: Maybe<Scalars['String']>;
  netWeight?: Maybe<Scalars['String']>;
  purity?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  isOnDiscount?: Maybe<Scalars['Boolean']>;
  isHallmark?: Maybe<Scalars['Boolean']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  isFeatured?: Maybe<Scalars['Boolean']>;
  isTrending?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateMiscArgs = {
  key: Scalars['String'];
  value: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  token?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  categoryOne: CategoryOne;
  categoryTwo: CategoryTwo;
  price?: Maybe<Scalars['Float']>;
  favorite?: Maybe<Scalars['Boolean']>;
  weight?: Maybe<Scalars['String']>;
  grossWeight?: Maybe<Scalars['String']>;
  netWeight?: Maybe<Scalars['String']>;
  purity?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  isOnDiscount?: Maybe<Scalars['Boolean']>;
  isHallmark?: Maybe<Scalars['Boolean']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  isFeatured?: Maybe<Scalars['Boolean']>;
  isTrending?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  categoriesOne: Array<Maybe<CategoryOne>>;
  categoriesTwo: Array<Maybe<CategoryTwo>>;
  allProducts: Array<Maybe<Product>>;
  filters: Filter;
  filterProduct: Array<Maybe<Product>>;
  findMisc?: Maybe<Misc>;
};


export type QueryCategoriesOneArgs = {
  categoryOneId?: Maybe<Scalars['ID']>;
};


export type QueryCategoriesTwoArgs = {
  categoryTwoId?: Maybe<Scalars['ID']>;
};


export type QueryAllProductsArgs = {
  productId?: Maybe<Scalars['ID']>;
};


export type QueryFilterProductArgs = {
  productId?: Maybe<Array<Maybe<Scalars['ID']>>>;
  categoriesOne?: Maybe<Array<Maybe<Scalars['ID']>>>;
  categoriesTwo?: Maybe<Array<Maybe<Scalars['ID']>>>;
  price?: Maybe<Array<Maybe<Scalars['Float']>>>;
  weight?: Maybe<Array<Maybe<Scalars['String']>>>;
  purity?: Maybe<Array<Maybe<Scalars['String']>>>;
  gender?: Maybe<Array<Maybe<Scalars['String']>>>;
  size?: Maybe<Array<Maybe<Scalars['String']>>>;
  isHallmark?: Maybe<Scalars['Boolean']>;
  isFeatured?: Maybe<Scalars['Boolean']>;
  isTrending?: Maybe<Scalars['Boolean']>;
};


export type QueryFindMiscArgs = {
  key: Array<Maybe<Scalars['ID']>>;
};

