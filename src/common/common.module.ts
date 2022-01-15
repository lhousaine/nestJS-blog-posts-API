import { Module } from '@nestjs/common';
import { CustomFilterService } from './filters/customFilter.service';
import { ICustomFilterService } from './filters/icumstomFilter.service';
import { ISortingService } from './sorting/isorting.service';
import { SortingService } from './sorting/sorting.service';

@Module({
  providers: [
    {
      provide: ISortingService,
      useClass: SortingService,
    },
    {
      provide: ICustomFilterService,
      useClass: CustomFilterService,
    },
  ],
  exports: [ISortingService, ICustomFilterService],
})
export class CommonModule {}
