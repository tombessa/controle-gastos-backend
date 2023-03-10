import prismaClient from "../../prisma";

interface GoalRequest{
  id?: string,
  amount?: number;
  category_id?: string;
  amount_compare?: string;
  created_by: string;
}


class ListGoalService{
  async execute({ id, amount, category_id, amount_compare, created_by}: GoalRequest){

    let query = {
      where:{
      },
      include:{
        category: true
      }
    };
    query.where = {...query.where, created_by: created_by};
    if(id) query.where = {...query.where, id:id};
    if((amount)&&(amount_compare==='=')) query.where = {...query.where, amount:amount};
    if((amount)&&(amount_compare==='>='))
      query.where = {...query.where, amount:{gte:amount}};
    if((amount)&&(amount_compare==='<='))
      query.where = {...query.where, amount:{lte:amount}};
    if((amount)&&(amount_compare==='>'))
      query.where = {...query.where, amount:{gt:amount}};
    if((amount)&&(amount_compare==='<'))
      query.where = {...query.where, amount:{lt:amount}};

    if(category_id) query.where = {...query.where, category_id:category_id};

    const goal = await prismaClient.goal.findMany(query);
    return goal;

  }
}

export { ListGoalService }