import { FastifyReply, FastifyRequest } from 'fastify';
import Logger from '../../utils/log';

const logger = new Logger('Dominate');

interface Skill {
  SkillId: number;
  SalesPackage: {
    GameSalesPackageId: number;
    Gems: number;
    Economy: number;
    Free: boolean;
  };
}

export async function GetSkills(request: FastifyRequest, reply: FastifyReply) {
  const skills = request.body as Skill[];
  const modifiedSkills = skills.map((skill, i) => {
    let modifiedSkill: Skill = { ... skill };
    modifiedSkill.SkillId = i + 1;
    modifiedSkill.SalesPackage = {
      GameSalesPackageId: modifiedSkill.SkillId,
      Gems: skill.SalesPackage.Gems,
      Economy: 0,
      Free: skill.SalesPackage.Free
    };
    return modifiedSkill;
  });
  reply.send(modifiedSkills);
}
