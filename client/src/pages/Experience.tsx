import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Experience() {
  const experiences = [
    {
      company: "Хакатон-1",
      position: "Junior Frontend Developer",
      period: "Май 2024г.",
      description: "Первый хакатон был организован университетом «Синергия» в формате LAN. Этот хакатон не увенчался большим успехом, но стал хорошим стартом для дальнейшего развития.",
      achievements: [
        "Моя задача заключалась в создании макета сайта в Figma и его верстке",
        "Верстка была выполнена на чистом HTML и CSS",
      ]
    },
    {
      company: "Хакатон-2",
      position: "Junior Frontend Developer",
      period: "Октябрь 2024г.",
      description: "Второй хакатон был посвящён разработке чат-ассистента для компании Ростелеком, который должен был заменить до 70% работы сотрудников Call-центров. Сайт был разработан на фреймворке Next.js с использованием различных библиотек. Этот хакатон стал более успешным: я занял второе место и получил предложение о работе в Ростелеком.",
      achievements: [
        "Разрабатывал чат-бота и frontend часть сайта (главную страницу и сам чат)",
        "Занимался настройкой сервера и подключением домена",
      ]
    },
    {
      company: "Хакатон-3",
      position: "Junior Frontend Developer",
      period: "Декабрь 2024г.",
      description: "Третий хакатон был всероссийским и организован Федерацией спортивного программирования. Он проводился в онлайн-формате, и задача заключалась в разработке сайта \"Календарь спортивных событий\". На первом этапе мы заняли 16-е место в России и 2-е место в своём городе, что позволило нам попасть в финал онлайн-этапа. К сожалению, в финале мы не вошли в топ-5, что не позволило нам пройти на LAN-стадию соревнований. Тем не менее, для меня этот хакатон стал наиболее результативным, так как я проявил высокий интерес и вложил много усилий в работу.",
      achievements: [
        "Разрабатывал макет сайта",
        "Верстал макет",
        "Интегрировал Frontend и Backend части"
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Опыт работы</h1>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{exp.company}</CardTitle>
                  <p className="text-primary font-medium">{exp.position}</p>
                </div>
                <span className="text-muted-foreground">{exp.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{exp.description}</p>
              <ul className="list-disc list-inside space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-muted-foreground">
                    {achievement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
