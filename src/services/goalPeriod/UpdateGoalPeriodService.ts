import prismaClient from "../../prisma";
import {ListPeriodService, PeriodRequest} from "../period/ListPeriodService";
import {ListGoalPeriodService} from "./ListGoalPeriodService";

interface GoalPeriodRequest{
  id: string,
  amount: number;
  period_id: string;
  category_id: string;
  updated_by: string;
}
interface GoalPeriodRequest2{
  amount: number;
  category_id: string;
  period: PeriodRequest;
  updated_by: string;
}


class UpdateGoalPeriodService{

  async execute2({amount, category_id, period, updated_by}: GoalPeriodRequest2){
    if(amount===undefined)throw new Error('Amount invalid')
    if(period===undefined)throw new Error('Period invalid')
    if(period.month===undefined)throw new Error('Period Month invalid')
    if(period.year===undefined)throw new Error('Period Year invalid')


    let lPeriod = await (new ListPeriodService()).execute({created_by: updated_by, month: period.month, year: period.year});

    if(lPeriod.length>0){
      let goalPeriods = await (new ListGoalPeriodService()).execute({
        amount,
        category_id,
        period_id: lPeriod(0).id,
        created_by: updated_by
      })

      if(goalPeriods.length>0){
        const goalPeriod = await prismaClient.goalPeriod.update({
          where:{
            id: goalPeriods(0).id
          },
          data:{
            amount: amount,
            updated_at: new Date()
          },
          select:{
            id: true,
            amount: true,
            period_id: true,
            category_id: true
          }
        })
        return goalPeriod;
      }
      throw new Error('Goal Period not exists')
    }
    throw new Error('Period not exists')

  }

  async execute({ id, amount, category_id, period_id,  updated_by}: GoalPeriodRequest){

    if(!id)throw new Error('Id invalid')
    if(amount===undefined)throw new Error('Amount invalid')
    if(!period_id)throw new Error('Period invalid')
    if(!category_id)throw new Error('Period invalid')

    const goalPeriod = await prismaClient.goalPeriod.update({
      where:{
        id: id
      },
      data:{
        amount: amount,
        period_id: period_id,
        category_id: category_id,
        updated_at: new Date(),
        updated_by: updated_by,
      },
      select:{
        id: true,
        amount: true,
        period_id: true,
        category_id: true
      }
    })


    return goalPeriod;

  }
}

export { UpdateGoalPeriodService }