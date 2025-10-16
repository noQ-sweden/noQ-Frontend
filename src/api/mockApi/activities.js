function generateActivities(count = 25)
{
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-alapú: 0 = január
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cities = ["Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås"];
  const hashtags = ["#Anmält", "#Frivillig", "#Pågående"];

  const titles = ["Optio", "Eligendi", "Eveniet", "Maxime", "Occaecati facere", "Aliquam sapiente", "Dolorem quibusdam", "Veniam"];
  const descriptionsBase = [
    "Architecto possimus placeat iure.",
    "Iste rem sunt doloremque.",
    "Quod veniam atque dicta itaque animi libero reprehenderit.",
    "Sapiente facere eius magnam amet nam.",
    "Esse amet quo dolores illum sed maxime.",
    "Architecto excepturi delectus enim reiciendis ipsum.",
    "Voluptas minima nisi eligendi nihil aperiam nostrum.",
    "Vel ullam laborum optio amet sint.",
  ];

  const activities = [];

  for (let i = 1; i <= count; i++) {
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const durationHrs = Math.floor(Math.random() * 48) + 1;

    const start = new Date(year, month, day, hour, minute);
    const end = new Date(start.getTime() + durationHrs * 3600 * 1000);

    let desc = descriptionsBase[Math.floor(Math.random() * descriptionsBase.length)];

    // @város 7-esével
    if (i % 7 === 0) {
      desc += ` @${cities[Math.floor(Math.random() * cities.length)]}`;
    }
    // #Anmält 
    else if (i % 13 === 0) {
      desc += ` ${hashtags[0]}`; // itt #Anmält
    }

    activities.push({
      id: i,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: desc,
      start_time: start.toISOString().slice(0, 19).replace("T", " "),
      end_time: end.toISOString().slice(0, 19).replace("T", " "),
      is_approved: Math.random() < 0.5 ? 0 : 1,
    });
  }

  return activities;
}

export const activities = generateActivities(100);