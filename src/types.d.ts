export type Maybe<T> = T | null;
export type GQLInput<T> = {input: T};
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
  categories: Array<Maybe<Category>>;
  secondCategories: Array<Maybe<SecondCategory>>;
  thirdCategories: Array<Maybe<ThirdCategory>>;
};


export type QuerySecondCategoriesArgs = {
  category?: Maybe<Scalars['String']>;
};


export type QueryThirdCategoriesArgs = {
  secondCategory?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  updateCategory?: Maybe<Category>;
  deleteCategory?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateCategoryArgs = {
  input?: Maybe<CategoryInput>;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};

export type Category = {
   __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  orderOfDisplay?: Maybe<Scalars['Int']>;
};

export type SecondCategory = {
   __typename?: 'SecondCategory';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  category: Category;
};

export type ThirdCategory = {
   __typename?: 'ThirdCategory';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  secondCategory: SecondCategory;
};

export type Product = {
   __typename?: 'Product';
  Name?: Maybe<Scalars['String']>;
  Category: Category;
  secondCategory: SecondCategory;
  thirdCategory?: Maybe<ThirdCategory>;
  Price?: Maybe<Scalars['Int']>;
  favorite?: Maybe<Scalars['Boolean']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  Weight?: Maybe<UnitValueObj>;
  Purity?: Maybe<UnitValueObj>;
  Gender?: Maybe<Scalars['String']>;
  Size?: Maybe<Scalars['String']>;
  isOnDiscount?: Maybe<Scalars['Boolean']>;
  isHallmark?: Maybe<Scalars['Boolean']>;
  isHidden?: Maybe<Scalars['Boolean']>;
};

export type UnitValueObj = {
   __typename?: 'UnitValueObj';
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type CategoryInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  orderOfDisplay?: Maybe<Scalars['Int']>;
};

