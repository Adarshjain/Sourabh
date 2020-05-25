export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
   __typename?: 'Query';
  categoriesOne: Array<Maybe<CategoryOne>>;
  categoriesTwo: Array<Maybe<CategoryTwo>>;
  allProducts: Array<Maybe<Product>>;
};


export type QueryCategoriesOneArgs = {
  categoryOneId?: Maybe<Scalars['String']>;
};


export type QueryCategoriesTwoArgs = {
  categoryTwoId?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  updateCategoryOne?: Maybe<CategoryOne>;
  deleteCategoryOne?: Maybe<Scalars['Boolean']>;
  updateCategoryTwo?: Maybe<CategoryTwo>;
  deleteCategoryTwo?: Maybe<Scalars['Boolean']>;
  updateProduct?: Maybe<CategoryTwo>;
  deleteProduct?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateCategoryOneArgs = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  orderOfDisplay: Scalars['Int'];
};


export type MutationDeleteCategoryOneArgs = {
  categoryOneId: Scalars['String'];
};


export type MutationUpdateCategoryTwoArgs = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  orderOfDisplay: Scalars['Int'];
  categoryOneId: Scalars['String'];
};


export type MutationDeleteCategoryTwoArgs = {
  categoryTwoId: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  categoryOne: CategoryOneInput;
  categoryTwo: CategoryTwoInput;
  price?: Maybe<Scalars['Int']>;
  favorite?: Maybe<Scalars['Boolean']>;
  images: Array<Maybe<Scalars['String']>>;
  weight?: Maybe<Scalars['String']>;
  purity?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  isOnDiscount?: Maybe<Scalars['Boolean']>;
  isHallmark?: Maybe<Scalars['Boolean']>;
  isHidden?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteProductArgs = {
  productId: Scalars['String'];
};

export type CategoryOne = {
   __typename?: 'CategoryOne';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  orderOfDisplay?: Maybe<Scalars['Int']>;
};

export type CategoryOneInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  orderOfDisplay?: Maybe<Scalars['Int']>;
};

export type CategoryTwo = {
   __typename?: 'CategoryTwo';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  categoryOne: CategoryOne;
  orderOfDisplay?: Maybe<Scalars['Int']>;
};

export type CategoryTwoInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  categoryOne: CategoryOneInput;
  orderOfDisplay?: Maybe<Scalars['Int']>;
};

export type Product = {
   __typename?: 'Product';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  categoryOne: CategoryOne;
  categoryTwo: CategoryTwo;
  price?: Maybe<Scalars['Int']>;
  favorite?: Maybe<Scalars['Boolean']>;
  images: Array<Maybe<Scalars['String']>>;
  weight?: Maybe<Scalars['String']>;
  purity?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  isOnDiscount?: Maybe<Scalars['Boolean']>;
  isHallmark?: Maybe<Scalars['Boolean']>;
  isHidden?: Maybe<Scalars['Boolean']>;
};

