import {prisma} from "@/prisma/prisma-client";

export async function toolsSeed() {
  await prisma.tool.createMany({
    data: [
      {name: 'Docker'},
      {name: 'Kubernetes'},
      {name: 'Postman'},
      {name: 'Figma'},
      {name: 'Git'},
      {name: 'VS Code'},
      {name: 'Jira'}
    ]
  })
}