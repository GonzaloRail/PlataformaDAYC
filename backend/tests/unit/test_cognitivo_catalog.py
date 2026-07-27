import json
import os
import pytest

CATALOG_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "..",
    "src",
    "application",
    "catalog",
    "dayc2_items",
    "cognitivo.json",
)


@pytest.fixture(scope="module")
def cognitivo_data():
    with open(CATALOG_PATH) as f:
        data = json.load(f)
    return data if isinstance(data, list) else data.get("items", [])


class TestCognitivoCatalogStructure:
    def test_total_items_is_49(self, cognitivo_data):
        assert (
            len(cognitivo_data) == 49
        ), f"Esperado 49 items, hay {len(cognitivo_data)}"

    def test_all_items_have_required_fields(self, cognitivo_data):
        required = {"id", "area", "numero", "gamificable", "pregunta"}
        for it in cognitivo_data:
            missing = required - it.keys()
            assert not missing, f"Item {it.get('id')} sin campos: {missing}"

    def test_all_actividad_digital_match_id(self, cognitivo_data):
        bad = []
        for it in cognitivo_data:
            act = it.get("actividad_digital")
            if act and act != it["id"]:
                bad.append(f"{it['id']} -> {act}")
        assert not bad, f"IDs inconsistentes: {bad}"

    def test_100_percent_coverage(self, cognitivo_data):
        with_act = [it for it in cognitivo_data if it.get("actividad_digital")]
        assert len(with_act) == 49, f"Cobertura: {len(with_act)}/49"

    def test_items_gamificable_have_actividad_digital(self, cognitivo_data):
        bad = []
        for it in cognitivo_data:
            if it.get("gamificable") and not it.get("actividad_digital"):
                bad.append(it["id"])
        assert not bad, f"Gamificables sin actividad_digital: {bad}"

    def test_ids_have_correct_format(self, cognitivo_data):
        bad = [
            it["id"] for it in cognitivo_data if not it["id"].startswith("COGNITIVO_")
        ]
        assert not bad, f"IDs mal formateados: {bad}"

    def test_numeros_are_unique(self, cognitivo_data):
        nums = [it["numero"] for it in cognitivo_data]
        duplicates = [n for n in nums if nums.count(n) > 1]
        assert not duplicates, f"Numeros duplicados: {set(duplicates)}"

    def test_tipos_evidencia_contains_log(self, cognitivo_data):
        bad = []
        for it in cognitivo_data:
            tipos = it.get("tipos_evidencia", [])
            if it.get("actividad_digital") and "LOG" not in tipos:
                bad.append(it["id"])
        assert not bad, f"Items con actividad_digital sin LOG en tipos_evidencia: {bad}"
