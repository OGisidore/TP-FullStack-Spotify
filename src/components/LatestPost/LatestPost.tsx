import React, { FC } from 'react'
import './LatestPost.css'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../Ui/Accordion'

interface LatestPostProps {}

const LatestPost: FC<LatestPostProps> = () => (
  <div className="article border-l border-b shadow-sm">
    <div className="blogIlustra flex">
      <img
        className="text-wrap w-52"
        src="data:image/png;base64,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"
        alt=""
      />
      <div className="descri">
        <h2 className="font-bold text-3xl">Introduction à TypeScript</h2>
        <p>create by Isid at 05/09/2024</p>
      </div>
    </div>
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="">Lecture</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          porro eveniet! Sunt labore hic omnis veniam exercitationem, assumenda
          quia unde? Quos distinctio impedit fugit hic praesentium nisi
          inventore! Repellendus, nobis? Id quas recusandae cumque quaerat
          numquam eveniet asperiores unde est. Doloremque blanditiis,
          dignissimos, voluptatibus ipsa explicabo quia nisi, quisquam corrupti
          veritatis praesentium magnam laborum reiciendis veniam sint quos
          quaerat delectus! Harum tempora sit consequatur aut incidunt facilis
          accusamus obcaecati, velit iste. Quod, similique, pariatur maiores,
          voluptate at enim quaerat perspiciatis illum dolor exercitationem
          rerum tenetur doloribus eligendi laboriosam placeat minus! Cum
          voluptatum animi atque eveniet illo dolorem aut sint. Voluptas
          distinctio iure vero officia aspernatur voluptatum quidem maiores
          sequi blanditiis ullam. Aspernatur perferendis alias quibusdam
          asperiores nesciunt expedita fugiat culpa! Earum expedita natus
          mollitia totam eligendi obcaecati a autem eum eaque, rerum placeat, ex
          labore maiores adipisci? Aperiam error officia natus nostrum iste
          recusandae! Quod minus tempora odio nostrum. Ullam. Maxime ut dolores
          ab esse necessitatibus repellendus reiciendis repudiandae ex maiores!
          Eum ipsam quaerat, repellendus ratione minima, ipsum, porro facere
          corporis totam vel sunt quibusdam libero. Architecto id assumenda
          error. At magnam repudiandae alias, perferendis quo id velit natus
          corrupti blanditiis laboriosam voluptatum quos minima quod itaque
          minus quas nihil non consequuntur? Aperiam, debitis dignissimos
          tenetur rerum minus necessitatibus molestias. Nulla illo quisquam
          beatae reiciendis eius laudantium maiores provident rem ex pariatur,
          accusantium eum ea fugiat iure incidunt cum, vel id odio consequuntur
          aspernatur necessitatibus fugit? Reprehenderit saepe dolores
          perferendis..
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
)

export default LatestPost
