import base64
from io import BytesIO
import matplotlib.pyplot as plt
from flask import make_response


def draw_diagram_get_png(first_seven_count, other_count, field):
    sum_of_first_seven = 0
    counts_of_first_seven = []
    names_of_first_seven = []
    for i in first_seven_count:
        names_of_first_seven.append(i[0])
        counts_of_first_seven.append(i[1])
        sum_of_first_seven += i[1]
    other_sum = other_count.all()[0][0] - sum_of_first_seven

    counts_of_first_seven.append(other_sum)
    names_of_first_seven.append('Other')
    fig = plt.figure(figsize=(10, 8))
    plt.pie(counts_of_first_seven)
    plt.legend(counts_of_first_seven, labels=names_of_first_seven, loc='best')
    label = str(field + '_count.png')
    buf = BytesIO()
    fig.savefig(buf, format="png")
    # data = base64.b64encode(buf.getbuffer()).decode("ascii")
    # image_url = f"<img src='data:image/png;base64,{data}'/>"
    response = make_response(buf.getvalue())
    response.headers['Content-Disposition'] = f'attachment; filename={field}s.png'
    response.mimetype = 'image/png'

    return response
