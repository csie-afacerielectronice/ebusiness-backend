import { Module } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import { ReviewsService } from './reviews/reviews.service';

@Module({
  providers: [ProductService, ProductsService, CategoriesService, ReviewsService]
})
export class StoreModule {}
